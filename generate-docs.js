import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rocket } from './git-rocket.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function renderRocketPage() {
  const rocketText = rocket.join('\n');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Git Rocket</title>
    <style>
      :root {
        color-scheme: dark;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #050816;
        color: #f7fafc;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      }

      pre {
        margin: 0;
        padding: 2rem;
        white-space: pre;
        line-height: 1.1;
      }
    </style>
  </head>
  <body>
    <pre>${rocketText}</pre>
  </body>
</html>
`;
}

export async function writeDocsSite(outputDir = path.join(__dirname, 'docs')) {
  await mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, 'index.html');
  await writeFile(outputPath, renderRocketPage(), 'utf8');
  return outputPath;
}

const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'));

if (isMain) {
  const outputPath = await writeDocsSite();
  console.log(`Generated ${outputPath}`);
}
