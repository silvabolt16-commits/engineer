// Cloudflare Pages Function: starts the GitHub OAuth flow for Decap CMS.
// Requires GITHUB_OAUTH_CLIENT_ID / GITHUB_OAUTH_CLIENT_SECRET set as env vars
// in the Cloudflare Pages project settings.
export async function onRequestGet({ request, env }) {
  if (!env.GITHUB_OAUTH_CLIENT_ID) {
    return new Response('Missing GITHUB_OAUTH_CLIENT_ID env var', { status: 500 });
  }

  const url = new URL(request.url);
  const state = crypto.randomUUID();

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID);
  authorizeUrl.searchParams.set('redirect_uri', `${url.origin}/callback`);
  authorizeUrl.searchParams.set('scope', 'repo,user');
  authorizeUrl.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      'Set-Cookie': `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}
