export const rocket = [
  String.raw`            /\             `,
  String.raw`           /  \           `,
  String.raw`          /____\          `,
  String.raw`           |  |           `,
  String.raw`           |  |           `,
  String.raw`          /|__|\          `,
  String.raw`         /  ||  \         `,
  String.raw`        /   ||   \        `,
  String.raw`       | B  ||    |       `,
  String.raw`       | I  ||    |       `,
  String.raw`         G  || T  |       `,
  String.raw`            || H  |       `,
  String.raw`       |    || R  |       `,
  String.raw`       |    || U  |       `,
  String.raw`      /|    || S  |\      `,
  String.raw`     /      || T  | \      `,
  String.raw`    /       || E     \     `,
  String.raw`   /___|____||_R   ___\   `,
  String.raw`     /   J  ||H     \     `,
  String.raw`    /    E  ||I      \    `,
  String.raw`   /     F  ||L       \   `,
  String.raw`  /      F  ||D        \  `,
  String.raw` /          ||E         \ `,
  String.raw` \          ||B         / `,
  String.raw`  \         ||R        /  `,
  String.raw`   \________||AND_____/   `,
  String.raw`        /   ||   \        `,
  String.raw`       /____||____\       `,
];

export const flames = [
  [
    String.raw`          \  :  /         `,
    String.raw`           . : .          `,
    String.raw`        --- : : ---       `,
    String.raw`            :.:           `,
  ],
  [
    String.raw`           .: :.          `,
    String.raw`        .  : : :  .       `,
    String.raw`          .: : :.         `,
    String.raw`        --- :.: ---       `,
    String.raw`            .:.           `,
  ],
  [
    String.raw`         \  : :  /        `,
    String.raw`          . : : .         `,
    String.raw`           .: :.          `,
    String.raw`        --- : : ---       `,
    String.raw`           .:::.          `,
    String.raw`            .:.           `,
  ],
];

// Only run animation when executed directly
const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'));
if (isMain) {

import('asciify').then(async ({ default: asciify }) => {

// Parse and sanitize -who argument
const whoIdx = process.argv.indexOf('-who');
const rawName = whoIdx !== -1 && process.argv[whoIdx + 1] ? process.argv[whoIdx + 1] : null;

let name = null;
if (rawName !== null) {
  const { sanitizeWho } = await import('./sanitize.js');
  const result = sanitizeWho(rawName);
  if (!result.valid) {
    console.error(result.reason);
    process.exit(1);
  }
  name = result.value;
}

const rows = process.stdout.rows || 40;
const totalFrames = rocket.length + rows;
const duration = 5000;
const frameDelay = Math.floor(duration / totalFrames);

process.stdout.write('\x1B[?25l'); // hide cursor
process.stdout.write('\x1B[2J');   // clear screen

let frame = 0;
let byeBannerLines = [];

// Generate banner(s), then start animation
const bannerPromises = [
  new Promise(resolve => asciify('Go', { font: 'standard' }, (err, res) => resolve(err ? '' : res))),
];
if (name) {
  bannerPromises.push(
    new Promise(resolve => asciify(name, { font: 'standard' }, (err, res) => resolve(err ? '' : res)))
  );
}
Promise.all(bannerPromises).then(results => {
  byeBannerLines = results.flatMap(r => r.split('\n').filter(l => l.trim()));

  const flameColors = ['\x1B[30m', '\x1B[31m', '\x1B[33m', '\x1B[38;5;208m'];
  const interval = setInterval(() => {
  const flameSet = flames[frame % flames.length];
  const coloredFlameSet = flameSet.map((line, i) =>
    flameColors[(frame + i) % flameColors.length] + line + '\x1B[0m'
  );
  const fullRocket = [...rocket, ...coloredFlameSet, ...byeBannerLines];
  const offset = rows - frame;

  process.stdout.write('\x1B[H'); // move cursor home

  for (let row = 0; row < rows; row++) {
    const rocketRow = row - offset;
    if (rocketRow >= 0 && rocketRow < fullRocket.length) {
      process.stdout.write(fullRocket[rocketRow]);
    } else {
      process.stdout.write(' '.repeat(28));
    }
    process.stdout.write('\x1B[K\n'); // clear rest of line
  }

  frame++;
  if (frame > totalFrames + byeBannerLines.length) {
    clearInterval(interval);
    process.stdout.write('\x1B[?25h'); // show cursor
    process.stdout.write('\x1B[2J\x1B[H'); // clear & home
    console.log('\uD83D\uDE80 Liftoff!');
  }
}, frameDelay);

}); // end Promise.all

process.on('SIGINT', () => {
  process.stdout.write('\x1B[?25h');
  process.exit();
});

}); // end asciify import

} // end isMain
