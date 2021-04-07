const { randomInt } = require("crypto");
const readlineSync = require("readline-sync");

const wordRandomPick = (array) => {
  const randomize = randomInt(0, array.length);
  return `${array[randomize]}`;
};

exports.wordRandomPick = wordRandomPick;
