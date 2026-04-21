import http from 'node:http';
import { renderRocketText } from './rocket.js';
import { sanitizeWho } from './sanitize.js';

const DEFAULT_PORT = 3000;

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function getWhoFromQuery(searchParams) {
  const rawWho = searchParams.get('who');
  if (rawWho == null) {
    return null;
  }

  const result = sanitizeWho(rawWho);
  return result.valid ? result.value : null;
}

export function renderRocketPage(who = null) {
  const rocketText = escapeHtml(renderRocketText(who));
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Git Rocket</title>
  </head>
  <body>
    <pre>${rocketText}</pre>
  </body>
</html>`;
}

export function createServer() {
  return http.createServer((request, response) => {
    const url = new URL(request.url ?? '/', 'http://127.0.0.1');

    if (url.pathname !== '/') {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }

    const who = getWhoFromQuery(url.searchParams);

    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(renderRocketPage(who));
  });
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  const parsedPort = Number.parseInt(process.env.PORT ?? `${DEFAULT_PORT}`, 10);
  const port = Number.isNaN(parsedPort) ? DEFAULT_PORT : parsedPort;
  const server = createServer();
  server.listen(port, () => {
    console.log(`Git Rocket web listening on http://127.0.0.1:${port}`);
  });
}
