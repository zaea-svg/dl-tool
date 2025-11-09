/*
  Netlify Function qui déclenche le repository_dispatch GitHub.
  Configure GITHUB_TOKEN dans Netlify: Site settings → Build & deploy → Environment → Environment variables
*/
exports.handler = async function(event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const { url } = body;
    if (!url) return { statusCode: 400, body: 'missing url' };
    if (!url.includes('borntobefuck.com')) return { statusCode: 400, body: 'invalid url' };

    const token = process.env.GITHUB_TOKEN;
    if (!token) return { statusCode: 500, body: 'server misconfigured: missing GITHUB_TOKEN' };

    const repo = 'zaea-svg/dl-tool';
    const res = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ event_type: 'download', client_payload: { url } })
    });

    if (!res.ok) {
      const text = await res.text();
      return { statusCode: 500, body: `dispatch failed: ${text}` };
    }

    return { statusCode: 200, body: 'ok' };
  } catch (e) {
    return { statusCode: 500, body: String(e.message || e) };
  }
};