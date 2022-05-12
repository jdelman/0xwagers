function expandRange(range: Array<number>) {
  const ret = [];
  for (let i = range[0]; i <= range[1]; i++) {
    ret.push(i);
  }
  return ret;
}

export const emojiValid1 = [
  0x203C,
  0x2049,
  0x2122,
  0x2139,
  ...expandRange([0x2194, 0x2199]),
  0x21A9,
  0x21AA,
  0x231A,
  0x231B,
  0x2328,
  0x23CF,
  ...expandRange([0x23E9, 0x23F3]),
  ...expandRange([0x23F8, 0x23FA]),
  0x24C2,
  0x25AA,
  0x25AB,
  0x25B6,
  0x25C0,
  ...expandRange([0x25FB, 0x25FE]),
  0x2600,
  0x2601,
  0x2602,
  0x2603,
  0x2604,
  0x260E,
  0x2611,
  0x2614,
  0x2615,
  0x2618,
  0x261D,
  0x2620,
  0x2622,
  0x2623,
  0x2626,
  0x262A,
  0x262E,
  0x262F,
  0x2638,
  0x2639,
  0x263A,
  0x2640,
  0x2642,
  ...expandRange([0x2648, 0x2653]),
];

export const emojiValid = [8252, 8265, 8482, 8505, 8596, 8597, 8598, 8599, 8600, 8601, 8617, 8618, 8986, 8987, 9000, 9167, 9193, 9194, 9195, 9196, 9197, 9198, 9199, 9200, 9201, 9202, 9203, 9208, 9209, 9210, 9410, 9642, 9643, 9654, 9664, 9723, 9724, 9725, 9726, 9728, 9729, 9730, 9731, 9732, 9742, 9745, 9748, 9749, 9752, 9757, 9760, 9762, 9763, 9766, 9770, 9774, 9775, 9784, 9785, 9786, 9792, 9794, 9800, 9801, 9802, 9803, 9804, 9805, 9806, 9807, 9808, 9809, 9810, 9811];

function encodeEmoji(str: string) {
  const asBase64 = btoa(str);
  return asBase64;
}

const test = {
  proposition: '',
  outcomes: ['a', 'b'],
};

console.log('encodeEmojitest=', encodeEmoji(JSON.stringify(test)));