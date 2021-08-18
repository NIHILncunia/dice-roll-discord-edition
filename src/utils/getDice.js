/**
 * @param {string} dice
 * @param {string} type
 */
module.exports = (dice, type) => {
  const dicesString = /\w+(?=[D])/i;
  const suffixString = /(?<=d)[0-9.]+/i;

  if (dice.includes('*')) {
    const newDiceArray = dice.split('*');

    const newDice = newDiceArray[0];
    const multiple = newDiceArray[1];

    const dicesArray = newDice.match(dicesString);
    const dices = dicesArray ? Number(dicesArray[0]) : 1;

    const suffixArray = newDice.match(suffixString);
    const suffix = Number(suffixArray[0]);

    /** @type {number} */
    let roll;
    /** @type {number[]} */
    let rollArray = [];
    /** @type {number[][]} */
    const multiBox = [];

    for (let i = 0; i < multiple; i++) {
      for (let j = 0; j < dices; j++) {
        switch (type) {
          case 'normal':
            roll = Math.ceil(Math.random() * suffix);
            break;
          case 'min':
            roll = 1;
            break;
          case 'max':
            roll = suffix;
            break;
          default:
            break;
        }

        rollArray.push(roll);
      }

      multiBox.push(rollArray);
      rollArray = [];
    }

    return multiBox;
  } else {
    const dicesArray = dice.match(dicesString);
    const dices = dicesArray ? Number(dicesArray[0]) : 1;

    const suffixArray = dice.match(suffixString);
    const suffix = Number(suffixArray[0]);

    /** @type {number} */
    let roll;
    /** @type {number[]} */
    const rollArray = [];

    for (let i = 0; i < dices; i++) {
      switch (type) {
        case 'normal':
          roll = Math.ceil(Math.random() * suffix);
          break;
        case 'min':
          roll = 1;
          break;
        case 'max':
          roll = suffix;
          break;
        default:
          break;
      }

      rollArray.push(roll);
    }

    return rollArray;
  }
};
