const Command = require('../Structures/Command');

module.exports = new Command({
  id: 6,
  name: '계산',
  description: '간단한 계산을 대신해줍니다.',
  async run(message, args, client, userId) {
    // eslint-disable-next-line no-new-func
    const Eval = (new Function(`return ${args[1]}`))();

    message.channel.send(`${userId} 계산 결과는 ***${Eval}*** 입니다.`);
  },
});
