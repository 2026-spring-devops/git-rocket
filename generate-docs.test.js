import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { rocket } from './git-rocket.js';
import { renderRocketPage, writeDocsSite } from './generate-docs.js';

describe('[docs] static docs generator', () => {
  it('renders the rocket inside a pre block', () => {
    const html = renderRocketPage();

    assert.match(html, /<!doctype html>/i);
    assert.match(html, /<pre>[\s\S]*<\/pre>/);

    for (const line of rocket) {
      assert.ok(html.includes(line), `Missing rocket line: ${line}`);
    }
  });

  it('writes docs/index.html to the requested directory', async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), 'git-rocket-docs-'));
    const outputPath = await writeDocsSite(tempDir);
    const html = await readFile(outputPath, 'utf8');

    assert.equal(outputPath, path.join(tempDir, 'index.html'));
    assert.match(html, /<title>Git Rocket<\/title>/);
    assert.match(html, /<pre>[\s\S]*<\/pre>/);
  });
});
