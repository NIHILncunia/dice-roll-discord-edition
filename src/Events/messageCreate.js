const Event = require('../Structures/Event');

module.exports = new Event('messageCreate', (client, message) => {
  // 봇이 준비된 상태에서 각 명령어를 실행하는 구간
  if (!message.content.startsWith(client.prefix)) return;

  // 1. 사용자의 채팅에서 접두어를 제외한다.
  // 2. 명령어 리스트에 존재하는지 대조를 하고 같은 게 있으면 가져온다.
  // 3. 사용자를 멘션할 때에 사용한다.
  const args = message.content.substring(client.prefix.length).trim().split(/ +/);
  const command = client.commands.find((cmd) => cmd.name === args[0]);
  const userId = `<@${message.author.id}>`;

  // 대조를 했을 때 명령어가 존재하지 않으면 값이 없기 때문에 없을 경우에는 없다고 알려준다.
  // if (!command) return message.channel.send(`${userId} ***${args[0]}***라는 명령어는 존재하지 않습니다.`);
  if (!command) return;

  // 값이 존재하면 함수를 실행해서 해당 명령어의 기능을 수행한다.
  command.run(message, args, client, userId);
});
