const rocket = [
  String.raw`            /\            `,
  String.raw`           /  \           `,
  String.raw`          /____\          `,
  String.raw`           |  |           `,
  String.raw`           |  |           `,
  String.raw`          /|__|\          `,
  String.raw`         /  ||  \         `,
  String.raw`        /   ||   \        `,
  String.raw`       |    ||    |       `,
  String.raw`       |    ||    |       `,
  String.raw`       |    ||    |       `,
  String.raw`       |    ||    |       `,
  String.raw`       |    ||    |       `,
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

const flames = [
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

const rows = process.stdout.rows || 40;
const totalFrames = rocket.length + rows;
const duration = 5000;
const frameDelay = Math.floor(duration / totalFrames);

process.stdout.write('\x1B[?25l'); // hide cursor
process.stdout.write('\x1B[2J');   // clear screen

let frame = 0;

const interval = setInterval(() => {
  const flameSet = flames[frame % flames.length];
  const fullRocket = [...rocket, ...flameSet];
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
  if (frame > totalFrames) {
    clearInterval(interval);
    process.stdout.write('\x1B[?25h'); // show cursor
    process.stdout.write('\x1B[2J\x1B[H'); // clear & home
    console.log('\uD83D\uDE80 Liftoff!');
  }
}, frameDelay);

process.on('SIGINT', () => {
  process.stdout.write('\x1B[?25h');
  process.exit();
});
