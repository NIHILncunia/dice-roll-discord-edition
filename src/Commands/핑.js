const Command = require('../Structures/Command');
// 명령어 클래스를 가져온다.

// 인스턴스를 만들어서 내보낸다. 명령어를 효율적으로 관리할 수 있다.
module.exports = new Command({
  id: 1,
  name: '핑',
  description: 'DiceRoll의 핑을 보여줍니다.',
  async run(message, args, client, userId) {
    const Ping = client.ws.ping;
    message.channel.send(`${userId} 현재 ***DiceRoll***의 핑은 ***${Ping}ms*** 입니다.`);
  },
});
