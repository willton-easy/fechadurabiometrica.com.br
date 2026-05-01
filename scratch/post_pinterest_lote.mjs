import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import path from 'path';

puppeteer.use(StealthPlugin());

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const SESSION_DIR = "C:\\Users\\willt\\OneDrive\\Desktop\\Meus Documentos\\fechadurabiometrica.com.br\\.pinterest_session";

const PINS = [
    {
        image: "C:\\Users\\willt\\OneDrive\\Desktop\\Meus Documentos\\fechadurabiometrica.com.br\\src\\assets\\images\\artigos\\hero_fechadura_vidro_luxo_1776815910821.png",
        title: "🔒 Melhor Fechadura para Porta de Vidro 2026: Guia Completo",
        link: "https://fechadurabiometrica.com.br/guias/melhor-fechadura-digital-porta-de-vidro",
        desc: "Descubra os melhores modelos de fechadura digital para porta de vidro e como instalar sem furar."
    },
    {
        image: "C:\\Users\\willt\\OneDrive\\Desktop\\Meus Documentos\\fechadurabiometrica.com.br\\src\\assets\\images\\artigos\\fechadura_inteligente_airbnb_luxury_1776818212019.png",
        title: "🔑 Gestão de Airbnb 2026: Por que usar Fechadura Digital?",
        link: "https://fechadurabiometrica.com.br/guias/como-gerenciar-fechadura-airbnb-sem-furar",
        desc: "Otimize sua gestão de aluguel por temporada com automação e segurança de ponta."
    },
    {
        image: "C:\\Users\\willt\\OneDrive\\Desktop\\Meus Documentos\\fechadurabiometrica.com.br\\src\\assets\\images\\artigos\\intelbras_ifr7000_handle_2026.png",
        title: "🛡️ Intelbras IFR 7000: O Review Definitivo (Versão 2026)",
        link: "https://fechadurabiometrica.com.br/reviews/intelbras-ifr-7000",
        desc: "Análise técnica completa da fechadura digital mais vendida do Brasil."
    }
];

async function publishBatch() {
    console.log("🚀 Iniciando Lote de Pins de Alta Autoridade...");
    
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        userDataDir: SESSION_DIR,
        headless: false,
        args: ['--start-maximized']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    
    try {
        await page.goto('https://br.pinterest.com/', { waitUntil: 'networkidle2' });
        
        // Verifica login (simplificado para lote)
        if (page.url().includes('login')) {
            console.log("\n⚠️  LOGIN NECESSÁRIO: Aguardando login manual...");
            await page.waitForFunction(() => !window.location.href.includes('login'), { timeout: 120000 });
        }

        for (const pin of PINS) {
            console.log(`\n📍 Criando Pin: ${pin.title}`);
            await page.goto('https://br.pinterest.com/pin-builder/', { waitUntil: 'networkidle2' });
            
            const fileInput = await page.waitForSelector('input[type="file"]');
            await fileInput.uploadFile(pin.image);
            
            await page.waitForSelector('input[placeholder="Adicionar título"]');
            await page.type('input[placeholder="Adicionar título"]', pin.title, { delay: 50 });
            await page.type('input[placeholder="Adicionar link de destino"]', pin.link, { delay: 30 });
            await page.type('div[aria-label="Conte às pessoas do que trata o seu Pin"]', pin.desc, { delay: 20 });

            console.log("✅ Pin preparado. Aguardando publicação manual ou clique do usuário.");
            console.log("DICA: Clique em 'Publicar' no navegador para cada item.");
            
            // Espera o usuário clicar em publicar ou navegar para fora do builder
            await page.waitForFunction(() => !window.location.href.includes('pin-builder'), { timeout: 300000 });
            console.log("➡️ Próximo do lote...");
        }

        console.log("\n✨ LOTE CONCLUÍDO!");

    } catch (error) {
        console.error("❌ Erro no lote:", error.message);
    }
}

publishBatch();
