import type { APIRoute } from 'astro';
export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const rank = parseInt(url.searchParams.get('rank') || '1');
  const affiliateUrl = url.searchParams.get('url');

  if (!id) {
    return new Response(JSON.stringify({ error: 'Faltando ID do produto' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // --- LÓGICA DE ESCALONAMENTO (STAGGERING) ---
  // O usuário deseja atualizações começando às 0:00, com intervalo de 30min por rank.
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const targetRefreshTime = new Date(startOfToday.getTime() + (rank - 1) * 30 * 60 * 1000);
  
  let secondsUntilNextUpdate: number;
  if (now < targetRefreshTime) {
    // Ainda não chegamos no horário de atualização de hoje para este rank
    secondsUntilNextUpdate = Math.floor((targetRefreshTime.getTime() - now.getTime()) / 1000);
  } else {
    // Já passamos do horário de hoje, próxima atualização será amanhã no mesmo horário
    const targetTomorrow = new Date(targetRefreshTime.getTime() + 24 * 60 * 60 * 1000);
    secondsUntilNextUpdate = Math.floor((targetTomorrow.getTime() - now.getTime()) / 1000);
  }

  // Garantimos um mínimo de 10 min de cache para evitar loops, e um máximo de 24h
  const sMaxAge = Math.min(86400, Math.max(600, secondsUntilNextUpdate));

  const CACHE_HEADERS = {
    'Content-Type': 'application/json',
    'Cache-Control': `public, s-maxage=${sMaxAge}, stale-while-revalidate=86400`
  };

  try {
    const client_id = '3677831787454677';
    const client_secret = 'CqMn9A6D1uUlXUsAabVIVwGD4StkJ9n7';
    
    // 1. Tenta API Oficial (MLB)
    try {
        const authRes = await fetch('https://api.mercadolibre.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
        });
        const authData = await authRes.json();
        const token = authData.access_token;

        if (token) {
            const apiRes = await fetch(`https://api.mercadolibre.com/items/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (apiRes.ok) {
                const data = await apiRes.json();
                let reviews = { rating: 4.8, count: 120 };
                try {
                    const revRes = await fetch(`https://api.mercadolibre.com/reviews/item/${id}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (revRes.ok) {
                        const revData = await revRes.json();
                        reviews.rating = revData.rating_average || 4.8;
                        reviews.count = revData.paging.total || 120;
                    }
                } catch(re) {}

                return new Response(JSON.stringify({
                    price: data.price,
                    original_price: data.original_price,
                    free_shipping: data.shipping?.free_shipping || false,
                    stock: data.available_quantity || 0,
                    rating: reviews.rating,
                    reviews_count: reviews.count,
                    thumbnails: data.pictures?.slice(0, 3).map((p: any) => p.url.replace("-O.jpg", "-I.jpg")) || [],
                    source: 'api-auth'
                }), { status: 200, headers: CACHE_HEADERS });
            }
        }
    } catch(e) {}

    // 2. SCRAPER Deep (Link de Afiliado ou Catálogo)
    const scraperUrl = affiliateUrl || `https://www.mercadolivre.com.br/p/${id}`;
    const htmlRes = await fetch(scraperUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        },
        redirect: 'follow'
    });

    if (htmlRes.ok) {
        const htmlText = await htmlRes.text();
        const priceMatch = htmlText.match(/"current_price":\{"value":([0-9.]+)/) || htmlText.match(/itemprop="price" content="([0-9.]+)"/);
        const ratingMatch = htmlText.match(/"rating_average":([0-9.]+)/);
        const countMatch = htmlText.match(/"rating_count":([0-9]+)/);
        
        if (priceMatch && priceMatch[1]) {
            return new Response(JSON.stringify({
                price: parseFloat(priceMatch[1]),
                original_price: null,
                free_shipping: htmlText.includes('Frete grátis'),
                stock: 5,
                rating: ratingMatch ? parseFloat(ratingMatch[1]) : 4.8,
                reviews_count: countMatch ? parseInt(countMatch[1]) : 150,
                thumbnails: [],
                source: 'scraper-deep'
            }), { status: 200, headers: CACHE_HEADERS });
        }
    }

    // 3. FALLBACK SUPREMO: Firecrawl (Bypass total de bloqueios)
    try {
        const fcRes = await fetch('https://api.firecrawl.dev/v1/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer fc-eeea64a7bb0d422196e16ce3e1d48bc5`
            },
            body: JSON.stringify({
                url: scraperUrl,
                formats: ['json'],
                jsonOptions: {
                    schema: {
                        type: 'object',
                        properties: {
                            price: { type: 'number' },
                            rating: { type: 'number' },
                            reviews_count: { type: 'number' },
                            available_quantity: { type: 'number' }
                        }
                    }
                }
            })
        });

        if (fcRes.ok) {
            const fcData = await fcRes.json();
            if (fcData.data?.price) {
                return new Response(JSON.stringify({
                    price: fcData.data.price,
                    original_price: null,
                    free_shipping: true,
                    stock: fcData.data.available_quantity || 3,
                    rating: fcData.data.rating || 4.8,
                    reviews_count: fcData.data.reviews_count || 120,
                    thumbnails: [],
                    source: 'firecrawl'
                }), { status: 200, headers: CACHE_HEADERS });
            }
        }
    } catch(fe) {}

    return new Response(JSON.stringify({ error: 'Falha total na extração' }), { status: 200, headers: CACHE_HEADERS });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
