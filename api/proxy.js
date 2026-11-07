module.exports = async function handler(req, res) {
  const apiKey = process.env.VAMX_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'VAMX_API_KEY not configured' });

  const path = req.headers['x-proxy-path'];
  const method = (req.headers['x-proxy-method'] || 'GET').toUpperCase();
  let query = {};
  try { query = JSON.parse(req.headers['x-proxy-query'] || '{}'); } catch {}

  if (!path) return res.status(400).json({ error: 'x-proxy-path required' });

  try {
    const url = new URL('https://vamxapi.my.id' + path);
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
    }
    url.searchParams.set('apikey', apiKey);

    const init = {
      method,
      headers: {
        'x-api-key': apiKey,
        'Authorization': 'Bearer ' + apiKey,
        'Accept': '*/*'
      }
    };

    if (method !== 'GET' && method !== 'HEAD') {
      const ct = req.headers['content-type'];
      if (ct) init.headers['Content-Type'] = ct;
      const bodyBuf = await readBody(req);
      if (bodyBuf.length > 0) init.body = bodyBuf;
    }

    const r = await fetch(url.toString(), init);
    const text = await r.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }

    res.status(200).json({ ok: r.ok, status: r.status, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}