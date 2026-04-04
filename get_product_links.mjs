import puppeteer from 'puppeteer-core';

async function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

async function getAmazonLink(page, query) {
  console.log('Amazon: Searching for', query);
  await page.goto('https://www.amazon.com.br/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#twotabsearchtextbox');
  await page.type('#twotabsearchtextbox', query);
  await page.keyboard.press('Enter');
  
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => {});
  await delay(2000);
  
  // Click first result (make sure it's not a sponsored brand banner, but a product)
  const productSelector = 'div[data-component-type="s-search-result"] h2 a';
  await page.waitForSelector(productSelector);
  
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => {}),
    page.click(productSelector),
  ]);
  await delay(2000);
  
  // Wait for SiteStripe "Texto" or "Obter link"
  // The element is usually an a tag with id amzn-ss-text-link
  console.log('Amazon: Looking for SiteStripe...');
  const textLinkBtn = await page.$('#amzn-ss-text-link');
  if (!textLinkBtn) {
     console.log('Amazon: SiteStripe not found. returning current URL.');
     return page.url();
  }
  await textLinkBtn.click();
  await delay(2000);
  
  const textArea = await page.$('#amzn-ss-text-shortlink-textarea');
  if (textArea) {
      const val = await page.evaluate(el => el.value, textArea);
      return val;
  }
  return page.url();
}

async function getMLLink(page, query) {
  console.log('ML: Searching for', query);
  await page.goto('https://www.mercadolivre.com.br/', { waitUntil: 'domcontentloaded' });
  
  await page.waitForSelector('.nav-search-input');
  // clear input first
  await page.evaluate(() => document.querySelector('.nav-search-input').value = '');
  await page.type('.nav-search-input', query);
  await page.keyboard.press('Enter');
  
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => {});
  await delay(2000);
  
  const productSelector = 'ol.ui-search-layout li.ui-search-layout__item a.ui-search-link';
  await page.waitForSelector(productSelector);
  
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => {}),
    page.click(productSelector),
  ]);
  
  await delay(2000);
  
  // Find "Compartilhar" button or affiliate banner
  const shareLinksHtml = await page.evaluate(() => {
     // Mercado Livre has a share icon
     const btns = Array.from(document.querySelectorAll('button, a'));
     const shareBtn = btns.find(b => {
         const txt = b.innerText.toLowerCase();
         const aria = b.getAttribute('aria-label') || '';
         return txt.includes('compartilhar') || aria.toLowerCase().includes('compartilhar');
     });
     
     if (shareBtn) shareBtn.click();
     return !!shareBtn;
  });
  
  if (shareLinksHtml) {
      console.log('ML: Clicked share. waiting for modal...');
      await delay(2000);
      // Wait for "Copiar link" inside modal
      const copyVal = await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll('button, a, span'));
          const copyBtn = btns.find(b => b.innerText.toLowerCase().includes('copiar link'));
          if (copyBtn) copyBtn.click();
          // We might need to read from clipboard, but we can't easily do it if the browser restricts it.
          // Let's just return the URL instead if clipboard fails.
          return document.querySelector('input[readonly], textarea') ? 
                 document.querySelector('input[readonly], textarea').value : 
                 window.location.href;
      });
      return copyVal;
  }
  
  return page.url();
}

async function run() {
  const query = process.argv[2] || 'Fechadura Intelbras FR 10';
  const browserURL = 'http://127.0.0.1:9222';
  
  const browser = await puppeteer.connect({ browserURL, defaultViewport: null });

  const pages = await browser.pages();
  let amzPage = pages.find(p => p.url().includes('amazon.com.br'));
  let mlPage = pages.find(p => p.url().includes('mercadolivre.com.br'));
  
  if (!amzPage) {
     amzPage = await browser.newPage();
  }
  if (!mlPage) {
     mlPage = await browser.newPage();
  }

  // Bring to front 
  await amzPage.bringToFront();
  const amzLink = await getAmazonLink(amzPage, query);
  
  await mlPage.bringToFront();
  const mlLink = await getMLLink(mlPage, query);
  
  console.log(JSON.stringify({ amz: amzLink, ml: mlLink }));
  await browser.disconnect();
}

run().catch(console.error);
