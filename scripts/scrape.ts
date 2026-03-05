import { chromium } from "playwright-extra";
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
// @ts-ignore
chromium.use(stealthPlugin());
async function main() {
    console.log("Iniciando Playwright Stealth...");
    const b = await chromium.launch({ headless: true });
    const p = await b.newPage();
    
    console.log("Acessando API...");
    const res = await p.goto('https://api.mercadolibre.com/items/MLB2144222365');
    console.log("Status API Items:", res?.status());
    
    if (res?.status() === 403) {
        console.log("API bloqueada. Tentando raspar a página pública do produto...");
        await p.goto('https://produto.mercadolivre.com.br/MLB-2144222365-fechadura-digital-biometrica-e-senha-yale-ymf-40a-rl-preta-_JM');
        
        try {
            const price = await p.$eval('meta[itemprop="price"]', el => el.getAttribute('content'));
            console.log("Preço MetaTag:", price);
        } catch (e) {
            console.log("Erro MetaTag, tentando DOM HTML...");
            const price = await p.$eval('.ui-pdp-price__second-line .andes-money-amount__fraction', el => el.textContent);
            console.log("Preço Html:", price);
        }
    }
    await b.close();
}
main();
