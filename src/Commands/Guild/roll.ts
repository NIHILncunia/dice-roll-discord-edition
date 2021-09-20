import { ICommand, Roll } from '../../Types';
import getDice from '../../Utils/getDice';

let inputArray: string[];
let subValueArray: string[];
let subValue: string;
let lastValue: string;
let dice: string;
let pMod: number;
let mMod: number;
let modArray: number[] = [];

const roll: Roll = {
  diceBox: [],
  rollBox: [],
  rollTotal: [],
};

let modTotal: number;
let resultArray: string[] = [];
let diceInput: string;
let type: string;

export const command: ICommand = {
  id: 5,
  name: 'roll',
  description: '주사위를 굴립니다! 주사위에 대한 설명은 +주사위 명령어를 이용하세요.',
  aliases: [],
  run: (client, message, args, userId) => {
    if (message.content === '+roll') {
      message.channel.send(`${userId} **에러 1:** 값이 없습니다. 주사위식을 입력해야 합니다.`);
    } else {
      if (args[1] === 'min') {
        diceInput = args.slice(1).join(' ');
        type = 'min';
      } else if (args[1] === 'max') {
        diceInput = args.slice(1).join(' ');
        type = 'max';
      } else {
        diceInput = args.slice(0).join(' ');
        type = 'normal';
      }

      if (diceInput.includes('++')) {
        message.channel.send(`${userId} **에러 5:** 값을 더할 때에 **+**는 한 번만 입력해야 합니다.`);
        return;
      }

      if (diceInput.includes('-')) {
        if (diceInput.includes('+-') === false) {
          message.channel.send(`${userId} **에러 6:** 주사위식에 패널티를 적용할 때에는 **nDn+-n**의 형식을 따라야 합니다.`);
          return;
        }
      }

      inputArray = diceInput.split(' ');

      for (let x = 0; x <= inputArray.length - 1; x++) {
        subValue = inputArray[x].replace(/d/gi, 'D');
        subValueArray = subValue.split('+');

        if (subValue.match(/[0-9]/gi) === null) {
          message.channel.send(`${userId} **에러 2:** 주사위식에는 숫자를 같이 입력해야 합니다.`);
          return;
        }

        if (subValue.includes('DD')) {
          message.channel.send(`${userId} **에러 3:** 하나의 주사위 식에서 **D**는 한 번만 입력해야 합니다.`);
          return;
        }

        for (let xx = 0; xx <= subValueArray.length - 1; xx++) {
          lastValue = subValueArray[xx];

          if (lastValue.indexOf('D') === lastValue.length - 1) {
            message.channel.send(
              `${userId} **에러 4:** 굴릴 주사위의 개수만 입력했습니다. **D**의 뒤에 숫자를 입력해야 합니다.`
            );
            return;
          }

          if (lastValue.includes('D')) {
            if (lastValue.includes('**')) {
              message.channel.send(`${userId} **에러 8:** *****는 한 번만 입력해야 합니다.`);
              return;
            }

            if (lastValue.includes('*')) {
              dice = lastValue;

              const splitDice = dice.split('*');

              const newDice = splitDice[0];
              const multiple = splitDice[1];

              roll.rollBox = getDice(dice, type) as number[][];

              for (let i = 0; i < Number(multiple); i++) {
                roll.diceBox.push([ newDice, ]);
              }

              roll.rollTotal = roll.rollBox.map((item) => item.reduce((pre, crr) => pre + crr, 0));
            } else {
              dice = lastValue;

              const dices = getDice(dice, type) as number[];
              (roll.rollBox as number[][]).push(dices);
              roll.diceBox.push([ dice, ]);

              roll.rollTotal.push(dices.reduce((pre, crr) => pre + crr, 0));
            }
          } else {
            const mod = lastValue;

            if (mod.includes('-')) {
              if (mod.length === 1) {
                message.channel.send(
                  `${userId} **에러 7:** 올바른 패널티값을 입력해야 합니다. **-**의 뒤에 숫자를 입력해야 합니다.`
                );
                return;
              }

              mMod = Number(mod);
              modArray.push(mMod);
            } else {
              if (mod.includes('*')) {
                message.channel.send(
                  `${userId} **에러 9:** 주사위식에 곱셈을 사용했을 경우에는 보정치를 나중에 입력해야 합니다.`
                );
                return;
              }

              pMod = Number(mod);
              modArray.push(pMod);
            }
          }
        }

        const rollResult = [];

        for (let i = 0; i < roll.rollBox.length; i++) {
          const diceBox = roll.diceBox[i].join(', ');
          const rollBox = (roll.rollBox[i] as number[]).join(', ');
          const rollTotal = roll.rollTotal[i];

          const string = `${diceBox} → **${rollTotal}** *(${rollBox})*\n`;

          rollResult.push(string);
        }

        const modResult = modArray.length !== 0 ? modArray.join(', ') : '없음';

        const totalResult = roll.rollTotal.reduce((pre, crr) => Number(pre) + Number(crr), 0);
        modTotal = modArray.reduce((pre, crr) => Number(pre) + Number(crr), 0);

        const result = (
          `\n**[ 총합 ]**\n`
          + `${subValue} → **${totalResult + modTotal}**\n`
          + `\n**[ 상세 결과 ]**\n`
          + `${rollResult.join('')}`
          + `\n**[ 보정치 ]**\n`
          + `${modResult}\n`
        );

        resultArray.push(result);

        modArray = [];
        roll.rollBox = [];
        roll.rollTotal = [];
        roll.diceBox = [];
      }

      let typeString = '';

      switch (type) {
        case 'min':
          typeString = '최솟값 굴림 모드';
          break;
        case 'max':
          typeString = '최댓값 굴림 모드';
          break;
        case 'normal':
          typeString = '일반 굴림 모드';
          break;
        default:
          break;
      }

      message.channel.send(
        `${userId}\n`
        + `\`\`\``
        + `${typeString}`
        + `\`\`\``
        + `${resultArray.join('\n- - - - - - - - - - - - - - - - - - - -\n')}`
      );

      resultArray = [];
    }
  },
};
