import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import path from 'path';

puppeteer.use(StealthPlugin());

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const SESSION_DIR = "C:\\Users\\willt\\OneDrive\\Desktop\\Meus Documentos\\fechadurabiometrica.com.br\\.pinterest_session";

// Lista de Pins para postar (Usando os arquivos diretamente do PC)
const PINS = [
    {
        image: "C:\\Users\\willt\\OneDrive\\Desktop\\Pinterest_Pins_FechaduraBiometrica\\pin_luxury_door_biometric_1776616648865.png",
        title: "✨ Fechaduras Biométricas de Luxo: Segurança e Sofisticação",
        link: "https://fechadurabiometrica.com.br/guias/fechadura-digital-porta-vidro-puxador-h-design-luxo?utm_source=pinterest&utm_medium=autopost",
        desc: "Transforme a entrada da sua casa com tecnologia de ponta e design premium. Veja os modelos mais exclusivos de 2026."
    },
    {
        image: "C:\\Users\\willt\\OneDrive\\Desktop\\Pinterest_Pins_FechaduraBiometrica\\fechadura_litoral_luxo_2026_titanium_pvd_1774147639507.png",
        title: "🌊 Fechadura Digital para Litoral: Adeus Corrosão e Maresia!",
        link: "https://fechadurabiometrica.com.br/guias/fechadura-litoral-maresia?utm_source=pinterest&utm_medium=autopost",
        desc: "Morar na praia exige fechaduras especiais. Conheça os modelos com acabamento PVD e resistência IP65."
    }
];

async function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function autoPostBatch() {
    console.log("🚀 Iniciando upload DIRETO do seu PC...");
    
    let browser;
    try {
        browser = await puppeteer.launch({
            executablePath: CHROME_PATH,
            userDataDir: SESSION_DIR,
            headless: false,
            args: ['--start-maximized']
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });

        console.log("📍 Verificando autenticação...");
        await page.goto('https://br.pinterest.com/pin-builder/', { waitUntil: 'networkidle2' });

        const isLoggedIn = await page.evaluate(() => {
            return !window.location.href.includes('login');
        });

        if (!isLoggedIn) {
            console.log("\n⚠️ Login necessário. Faça o login manualmente e reinicie o script.");
            await browser.close();
            return;
        }

        console.log("✅ Conectado com sucesso!");

        for (let i = 0; i < PINS.length; i++) {
            const pin = PINS[i];
            console.log(`\n📌 Processando Pin ${i+1}/${PINS.length}: ${pin.title}`);
            
            await page.goto('https://br.pinterest.com/pin-creation-tool/', { waitUntil: 'networkidle2' });
            await delay(3000);

            console.log("📸 Enviando imagem no background...");
            // Ocultamente, o Pinterest tem um input[type=file]. Precisamos anexar o arquivo a ele
            // Em vez de clicar, vamos procurar o input e fazer o upload transparente
            const fileInput = await page.$('input[type="file"], input[accept*="image"]');
            if (fileInput) {
                await fileInput.uploadFile(pin.image);
                console.log("✅ Imagem injetada com sucesso!");
            } else {
                 console.log("⚠️ Input de arquivo não encontrado, tentando disparar file chooser manual...");
                 const [fileChooser] = await Promise.all([
                    page.waitForFileChooser(),
                    // Tenta clicar numa área baseada em posição na tela se o css selector falhar
                    page.mouse.click(300, 400)
                 ]);
                 await fileChooser.accept([pin.image]);
            }
            
            await delay(4000); // Espera a imagem carregar na tela

            console.log("✍️ Preenchendo dados...");
            
            // Título
            const titleElement = await page.$('input[placeholder="Adicionar título"], input[id="storyboard-selector-title"]');
            if (titleElement) {
                 // apaga pra ter certeza
                 await page.evaluate(el => el.value = '', titleElement);
                 await titleElement.type(pin.title, {delay: 30});
            } else {
                 await page.keyboard.press('Tab');
                 await page.keyboard.type(pin.title, {delay: 30});
            }
            
            // Descrição (focado no elemento de texto largo)
            // Se as classes mudaram, usamos aria-label ou similar
            const descElement = await page.$('div[role="textbox"], textarea');
            if (descElement) {
                await descElement.type(pin.desc, {delay: 20});
            }
            
            await delay(1000);

            // Link
            // Encontrando o input do link de destino
            const linkElement = await page.$('input[placeholder*="destino"], input[aria-label*="link"]');
            if (linkElement) {
                await linkElement.type(pin.link, {delay: 30});
            }

            console.log(`✅ Pin ${i+1} preparado. Clicando em Publicar...`);
            
            // Encontrar botão de publicar
            const publishButtons = await page.$$('button');
            for (const btn of publishButtons) {
                const text = await page.evaluate(el => el.textContent, btn);
                if (text && text.trim().toLowerCase() === 'publicar') {
                    await btn.click();
                    break;
                }
            }

            console.log(`⏳ Aguardando processamento do Pinterest...`);
            await delay(10000); 
            console.log(`🎉 Pin ${i+1} publicado!`);
        }
        
    } catch (e) {
        console.error("❌ ERRO FATAL:", e);
    } finally {
        if (browser) {
            console.log(" Fechando navegador...");
            await browser.close();
        }
    }
}

autoPostBatch();
