const { chromium } = require('playwright');

(async () => {
  console.log('🤖 Iniciando Pinterest Autopost...');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  
  try {
    // 1. Navegar ao Pin Builder
    console.log('📍 Navegando ao Pinterest...');
    await page.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'networkidle', timeout: 60000 });
    
    // 2. Tirar screenshot para ver estado
    await page.screenshot({ path: 'pinterest初始.png', fullPage: true });
    console.log('📸 Screenshot inicial salvado!');
    
    // Esperar usuário interacting
    console.log('⏳ Aguardando... (pressione Ctrl+C para sair)');
    await new Promise(() => {});
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await browser.close();
  }
})();