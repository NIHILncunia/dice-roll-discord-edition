const Command = require('../Structures/Command');

module.exports = new Command({
  id: 5,
  name: '주사위',
  description: '주사위에 대한 사용 가이드를 자세하게 볼 수 있습니다.',
  async run(message, args, client, userId) {
    message.channel.send(
      `${userId}\n\n` +
      `**RollDice 웹에 자세한 가이드가 존재하므로 링크를 전달합니다.**\n\n` +
      `https://thediceroll.github.io/` +
      `\n` +
      `*(DiceRoll 디스코드 봇은 커스텀 주사위만을 다룹니다.)*`
    );
  },
});
