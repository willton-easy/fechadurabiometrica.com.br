const https = require('https');

const payload = JSON.stringify({
  url: "https://www.amazon.com.br/dp/B0BXB7419R",
  formats: ["html"]
});

const options = {
  hostname: 'api.firecrawl.dev',
  path: '/v1/scrape',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer fc-eeea64a7bb0d422196e16ce3e1d48bc5',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      const html = parsed.data && parsed.data.html ? parsed.data.html : '';
      const imgs = [...new Set((html.match(/https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9_\-]+\.jpg/g) || []))]
        .filter(u => !u.includes('US40') && !u.includes('US35') && !u.includes('SX38'));
      console.log('Imagens encontradas:');
      imgs.slice(0, 8).forEach(u => console.log(u));
    } catch(e) {
      console.log('Erro ao parsear', e.message, data.slice(0,500));
    }
  });
});

req.on('error', e => console.error('Request error:', e));
req.write(payload);
req.end();
