const https = require('https');
const fs = require('fs');

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const get = (u) => {
      https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) { return get(res.headers.location); }
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(fs.statSync(dest).size); });
      }).on('error', (e) => { fs.unlink(dest, () => {}); reject(e); });
    };
    get(url);
  });
}

downloadImage(
  'https://http2.mlstatic.com/D_NQ_NP_2X_873727-MLA99423155746_112025-F.webp',
  'public/pado-fde-600-bio.webp'
).then((size) => console.log('Imagem salva! Tamanho:', size, 'bytes'));
