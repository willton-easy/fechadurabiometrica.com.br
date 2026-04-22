import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import path from 'path';

puppeteer.use(StealthPlugin());

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const SESSION_DIR = "C:\\Users\\willt\\OneDrive\\Desktop\\Meus Documentos\\fechadurabiometrica.com.br\\.pinterest_session";

const PIN_DATA = {
    image: "C:\\Users\\willt\\OneDrive\\Desktop\\Pinterest_Pins_FechaduraBiometrica\\pin_facial_recognition_lock.png",
    title: "🔒 Fechadura com Reconhecimento Facial: Vale a pena em 2026?",
    link: "https://fechadurabiometrica.com.br/guias/fechadura-digital-reconhecimento-facial-biometria-rosto",
    desc: "Descubra se as fechaduras faciais são seguras e quais os melhores modelos para sua casa."
};

async function publishPin() {
    console.log("🚀 Abrindo Pinterest em modo Assistido (Stealth)...");
    
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        userDataDir: SESSION_DIR,
        headless: false,
        args: ['--start-maximized']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    
    try {
        console.log("📍 Verificando autenticação...");
        await page.goto('https://br.pinterest.com/', { waitUntil: 'networkidle2' });

        // Espera estar logado. Se vir o botão de login, avisa o usuário.
        const isLoggedIn = await page.evaluate(() => {
            return !!document.querySelector('meta[name="apple-itunes-app"]'); // Pinterest logado tem essa meta ou similar
        });

        if (page.url().includes('login') || !isLoggedIn) {
            console.log("\n⚠️  POR FAVOR: Faça login no Pinterest na janela que abriu.");
            console.log("O script continuará automaticamente assim que detectar o login.\n");
            
            // Espera até que a URL mude ou o elemento de login desapareça
            await page.waitForFunction(() => !window.location.href.includes('login') && document.title.includes('Pinterest'), { timeout: 120000 });
            console.log("✅ Login detectado!");
        }

        console.log("📍 Indo para o Criador de Pins...");
        await page.goto('https://br.pinterest.com/pin-builder/', { waitUntil: 'networkidle2' });
        
        // Espera carregar o formulário (o selector pode variar)
        console.log("📸 Subindo imagem...");
        const fileInput = await page.waitForSelector('input[type="file"]', { timeout: 30000 });
        await fileInput.uploadFile(PIN_DATA.image);

        console.log("✍️ Preenchendo dados...");
        // Título - usando seletores mais genéricos pois o Pinterest muda as classes
        await page.waitForSelector('input[placeholder="Adicionar título"]');
        await page.type('input[placeholder="Adicionar título"]', PIN_DATA.title, { delay: 50 });
        
        // Link
        await page.type('input[placeholder="Adicionar link de destino"]', PIN_DATA.link, { delay: 30 });

        // Descrição
        await page.type('div[aria-label="Conte às pessoas do que trata o seu Pin"]', PIN_DATA.desc, { delay: 20 });

        console.log("\n✨ PIN PREPARADO COM SUCESSO!");
        console.log("O robô parou para que você confira e clique em 'Publicar'.");
        console.log("Depois que você publicar, pode fechar o navegador.");

    } catch (error) {
        console.error("❌ Erro:", error.message);
    }
}

publishPin();
