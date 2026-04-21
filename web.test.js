import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createServer, getWhoFromQuery, renderRocketPage } from './web.js';

const servers = [];

afterEach(async () => {
  await Promise.all(servers.splice(0).map(server => new Promise((resolve, reject) => {
    server.close(error => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  })));
});

describe('[web] query parsing', () => {
  it('accepts a valid who value', () => {
    const params = new URLSearchParams({ who: 'Alice' });
    assert.equal(getWhoFromQuery(params), 'Alice');
  });

  it('ignores an invalid who value', () => {
    const params = new URLSearchParams({ who: '<script>' });
    assert.equal(getWhoFromQuery(params), null);
  });
});

describe('[web] page rendering', () => {
  it('renders the rocket in a preformatted html response', () => {
    const page = renderRocketPage();
    assert.match(page, /<pre>[\s\S]*\/\\[\s\S]*<\/pre>/);
    assert.doesNotMatch(page, /Go .*?!/);
  });

  it('renders a personalized line below the rocket', () => {
    const page = renderRocketPage('Alice');
    assert.match(page, /Go Alice!/);
  });
});

describe('[web] http server', () => {
  it('serves the rocket from the root route', async () => {
    const server = createServer();
    servers.push(server);

    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const { port } = server.address();

    const response = await fetch(`http://127.0.0.1:${port}/?who=Alice`);
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'text/html; charset=utf-8');
    assert.match(body, /Go Alice!/);
  });

  it('returns 404 for non-root routes', async () => {
    const server = createServer();
    servers.push(server);

    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const { port } = server.address();

    const response = await fetch(`http://127.0.0.1:${port}/rocket`);

    assert.equal(response.status, 404);
  });
});
