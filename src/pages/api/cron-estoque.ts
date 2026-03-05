import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

// Inicializa o cliente Supabase com a Chave de Serviço (Que tem poder para deletar/atualizar produtos)
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''; // NOTA: Precisa ser a Service Role Key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    // 1. Segurança Máxima: Só a Vercel ou o CRON autorizado pode chamar esta rota
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        // 2. Busca todos os produtos do Supabase para verificar o estoque
        const { data: products, error } = await supabase.from('products').select('*');
        if (error) throw error;

        let atualizados: string[] = [];
        let substituidos: string[] = [];

        for (const prod of products) {
           if(!prod.mlbId) continue; // Pula os que não são do ML

           // 3. Consulta rápida de Preço/Estoque via Proxy (ScraperAPI)
           const scraperApiKey = process.env.SCRAPER_API_KEY || '105211ba9a271034298e655fcc559b8c';
           const targetUrl = encodeURIComponent(`https://api.mercadolibre.com/items/${prod.mlbId}`);
           const apiRes = await fetch(`http://api.scraperapi.com/?api_key=${scraperApiKey}&url=${targetUrl}`);

           if (apiRes.ok) {
               const data = await apiRes.json();
               const isPaused = data.status !== 'active';
               const currentStock = data.available_quantity || 0;

               // --- CENÁRIO A: Tem Estoque! Apenas atualiza o banco ---
               if (currentStock > 0 && !isPaused) {
                   await supabase.from('products').update({ stock: currentStock }).eq('id', prod.id);
                   atualizados.push(prod.name);
                   continue;
               }

               // --- CENÁRIO B: ESTOQUE ZERO ou PAUSADO (Hora do Robô Brilhar) ---
               // 4. Se chegou aqui, vamos caçar o curinga.
               const searchQuery = encodeURIComponent("fechadura digital biometrica");
               const searchUrl = encodeURIComponent(`https://api.mercadolibre.com/sites/MLB/search?q=${searchQuery}&sort=relevance`);
               const searchRes = await fetch(`http://api.scraperapi.com/?api_key=${scraperApiKey}&url=${searchUrl}`);

               if(searchRes.ok) {
                   const resData = await searchRes.json();
                   const mlItems = resData.results || [];
                   
                   // 5. Filtra: Pega o primeiro bom que NÃO seja um ID que já temos cadastrado
                   const currentMlbIds = products.map(p => p.mlbId);
                   const novoProduto = mlItems.find((item: any) => 
                       !currentMlbIds.includes(item.id) && 
                       item.condition === 'new' && 
                       item.available_quantity > 0
                   );

                   if (novoProduto) {
                       // ACHAMOS! Vamos sobrescrever o "buraco" do antigo produto no banco
                       const novoMlbId = novoProduto.id;
                       
                       // Ajustando a foto original 
                       const highResImage = novoProduto.thumbnail.replace('-I.jpg', '-O.jpg');
                       
                       // Cuidado: aqui você precisa do seu Gerador de Afiliado, 
                       // Mas o ML muitas vezes rastreia se você apensar os cookies/redirects.
                       const novoAffiliateLink = novoProduto.permalink; // Em Prod seria a API de Afiliados

                       await supabase.from('products').update({
                           name: novoProduto.title,
                           image: highResImage,
                           amazonUrl: '#ver-no-ml', // Esconde Amazon se ele nasceu do ML
                           mlUrl: novoAffiliateLink,
                           mlbId: novoMlbId,
                           stock: novoProduto.available_quantity,
                           rating: null, // Zero as avaliações para puxar na próxima vez
                           verdict: `(ATUALIZADO AUTOMATICAMENTE: O modelo original esgotou e o Robô encontrou esta nova Fechadura Inteligente em alta no Mercado Livre para você!) ${prod.verdict}`
                       }).eq('id', prod.id);

                       substituidos.push(`Saiu: ${prod.name} | Entrou: ${novoProduto.title}`);
                   }
               }
           }
        }

        return new Response(JSON.stringify({
            mensagem: 'Cron executado com sucesso',
            estoquesAtualizados: atualizados,
            curingasSubstitutos: substituidos
        }), { status: 200, headers: {'Content-Type': 'application/json'} });

    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
};
