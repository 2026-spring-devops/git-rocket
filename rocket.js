export const rocket = [
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

export function renderRocketLines(who = null) {
  if (!who) {
    return [...rocket];
  }

  return [...rocket, '', `Go ${who}!`];
}

export function renderRocketText(who = null) {
  return renderRocketLines(who).join('\n');
}
