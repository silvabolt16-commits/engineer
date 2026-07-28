// Cloudflare Pages Function: finishes the GitHub OAuth flow for Decap CMS,
// exchanging the code for a token and handing it back to the /admin popup.
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const savedState = (request.headers.get('Cookie') || '').match(/oauth_state=([^;]+)/)?.[1];

  if (!code || !state || state !== savedState) {
    return new Response('Invalid OAuth state', { status: 400 });
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
    }),
  });
  const data = await tokenRes.json();

  if (data.error || !data.access_token) {
    return new Response(`GitHub OAuth error: ${data.error_description || data.error || 'unknown'}`, { status: 400 });
  }

  const payload = JSON.stringify({ token: data.access_token, provider: 'github' }).replace(/'/g, "\\'");

  const html = `<!doctype html><html><body><script>
    (function() {
      function receiveMessage() {
        window.opener.postMessage('authorization:github:success:${payload}', '*');
        window.removeEventListener('message', receiveMessage, false);
      }
      window.addEventListener('message', receiveMessage, false);
      window.opener.postMessage('authorizing:github', '*');
    })();
  </script></body></html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
