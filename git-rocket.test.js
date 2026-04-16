import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { rocket, flames } from './git-rocket.js';

describe('[nose-cone] rocket nose cone', () => {
  it('should have a nose cone (lines 0-2)', () => {
    assert.match(rocket[0].trim(), /^\/\\$/, 'Tip of nose cone');
    assert.match(rocket[1].trim(), /^\/  \\$/, 'Middle of nose cone');
    assert.match(rocket[2].trim(), /^\/____\\$/, 'Base of nose cone');
  });
});

describe('[upper-body] rocket upper body', () => {
  it('should have the upper body (lines 3-5)', () => {
    assert.match(rocket[3].trim(), /^\|  \|$/, 'Upper body pipe');
    assert.match(rocket[4].trim(), /^\|  \|$/, 'Upper body pipe');
    assert.match(rocket[5].trim(), /^\/\|__\|\\$/, 'Body shoulder');
  });

  it('should have the mid body with inner lines (lines 6-7)', () => {
    assert.match(rocket[6].trim(), /^\/  \|\|  \\$/, 'Widening body');
    assert.match(rocket[7].trim(), /^\/   [\|A-Z]{2}   \\$/, 'Widening body');
  });
});

describe('[body-panels] rocket body panels', () => {
  it('should have 6 identical body panels (lines 8-13)', () => {
    for (let i = 8; i <= 13; i++) {
      assert.match(rocket[i].trim(), /^\|    [\|A-Z]{2}    \|$/, `Body panel at line ${i}`);
    }
  });
});

describe('[fins] rocket fin section', () => {
  it('should have the fin section (lines 14-17)', () => {
    assert.match(rocket[14].trim(), /^\/\|    [\|A-Z]{2}    \|\\$/, 'Fin start');
    assert.match(rocket[15].trim(), /^\/\s+\|    [\|A-Z]{2}    \|\s+\\$/, 'Fin widen');
    assert.match(rocket[16].trim(), /^\/\s+\|    [\|A-Z]{2}    \|\s+\\$/, 'Fin widen');
    assert.match(rocket[17].trim(), /^\/_+\|____[\|A-Z]{2}____\|_+\\$/, 'Fin base');
  });
});

describe('[nozzle] rocket nozzle and engine', () => {
  it('should have the nozzle section (lines 18-27)', () => {
    for (let i = 18; i <= 22; i++) {
      assert.match(rocket[i].trim(), /^[/\\]\s+\|\|\s+[/\\]$/, `Nozzle flare line ${i}`);
    }
    for (let i = 23; i <= 24; i++) {
      assert.match(rocket[i].trim(), /^[\\]\s+\|\|\s+[/]$/, `Nozzle converge line ${i}`);
    }
    assert.match(rocket[25].trim(), /^\\_{4,}\|\|_{4,}\/$/, 'Nozzle base');
    assert.match(rocket[26].trim(), /^\/\s+\|\|\s+\\$/, 'Engine inner');
    assert.match(rocket[27].trim(), /^\/_{2,}\|\|_{2,}\\$/, 'Engine base');
  });
});

describe('[full-rocket] complete rocket validation', () => {
  it('should have 28 lines', () => {
    assert.equal(rocket.length, 28);
  });

  it('should have consistent line width', () => {
    const width = rocket[0].length;
    rocket.forEach((line, i) => {
      assert.equal(line.length, width, `Line ${i} has width ${line.length}, expected ${width}`);
    });
  });

  it('should have the full rocket match exactly', () => {
    const expected = [
      String.raw`            /\            `,
      String.raw`           /  \           `,
      String.raw`          /____\          `,
      String.raw`           |  |           `,
      String.raw`           |  |           `,
      String.raw`          /|__|\          `,
      String.raw`         /  ||  \         `,
      String.raw`        /   SB   \        `,
      String.raw`       |    JA    |       `,
      String.raw`       |    BP    |       `,
      String.raw`       |    RV    |       `,
      String.raw`       |    JM    |       `,
      String.raw`       |    DR    |       `,
      String.raw`       |    ||    |       `,
      String.raw`      /|    ||    |\      `,
      String.raw`     / |    ||    | \     `,
      String.raw`    /  |    ||    |  \    `,
      String.raw`   /___|____||____|___\   `,
      String.raw`     /      ||      \     `,
      String.raw`    /       ||       \    `,
      String.raw`   /        ||        \   `,
      String.raw`  /         ||         \  `,
      String.raw` /          ||          \ `,
      String.raw` \          ||          / `,
      String.raw`  \         ||         /  `,
      String.raw`   \________||________/   `,
      String.raw`        /   ||   \        `,
      String.raw`       /____||____\       `,
    ];

    rocket.forEach((line, i) => {
      // Apply regex replacement only for lines 7–15 (items 8–16)
      if (i >= 7 && i <= 15) {
        const pattern = expected[i]
          .replace(/\\/g, '\\\\')        // escape backslashes FIRST
          .replace(/\|\|/g, '[\\|A-Z]{2}'); // then replace ||
        assert.match(line, new RegExp(pattern), `Line ${i + 1} does not match (RegEx)`);
      } else {
        assert.strictEqual(line, expected[i], `Line ${i + 1} does not match (Strict)`);
      }
    });
  });
});

describe('[flames] flame animations', () => {
  it('should have 3 flame frames', () => {
    assert.equal(flames.length, 3);
  });

  it('each flame frame should have at least 4 lines', () => {
    flames.forEach((frame, i) => {
      assert.ok(frame.length >= 4, `Flame frame ${i} has ${frame.length} lines, expected >= 4`);
    });
  });
});
