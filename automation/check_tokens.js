import https from 'https';

const tokens = [
  { name: 'User Provided (Sandbox)', value: 'pina_AMATLXAXAA6VIBAAGCABUC4MTGLK7HIBACGSPBPSQLDUCOFYKVBUTQEMXMZECKHBC5FNAFGWQTZIR56E2WHPRYWYM7JYIEYA' },
  { name: 'Production (Previous)', value: 'pina_AMATLXAXAA6VIBAAGCABUC4RD3NK3HIBQBIQC3ANNVXJ4PJ32VCE4F4IEKFGMUVWI3W4AVOK4B4WUNIQYFGELC4QUW72M2QA' }
];

async function checkToken(token) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.pinterest.com',
      path: '/v5/user_account',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', e => resolve({ error: e.message }));
    req.end();
  });
}

async function run() {
  for (const t of tokens) {
    console.log(`Checking ${t.name}...`);
    const status = await checkToken(t.value);
    console.log(JSON.stringify(status, null, 2));
    console.log('-------------------');
  }
}

run();
