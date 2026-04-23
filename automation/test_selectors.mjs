import { chromium } from 'playwright';
import path from 'path';

async function testSelectors() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('https://br.pinterest.com/pin-builder/');
  console.log("Aguardando 10 segundos para você ver a página...");
  await page.waitForTimeout(10000);

  const fileInput = await page.$('input[type="file"]');
  console.log("Input de arquivo encontrado:", !!fileInput);
  
  const title = await page.$('textbox[aria-label="Adicione um título"], textarea[placeholder="Adicione um título"]');
  console.log("Campo de título encontrado:", !!title);

  const desc = await page.$('div[role="combobox"][aria-label="Conte sobre o que é o seu Pin"]');
  console.log("Campo de descrição encontrado:", !!desc);

  const publish = await page.$('button:has-text("Publicar")');
  console.log("Botão publicar encontrado:", !!publish);

  await browser.close();
}

testSelectors();
