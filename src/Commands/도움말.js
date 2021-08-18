const { readdirSync, } = require('fs');
const Command = require('../Structures/Command');

module.exports = new Command({
  id: 3,
  name: '도움말',
  description: 'DiceRoll이 지원하는 명령어의 설명을 볼 수 있습니다.',
  async run(message, args, client, userId) {
    const commands = [];

    readdirSync('./src/Commands').filter((file) => file.endsWith('.js')).forEach((file) => {
      const commandFile = require(`../Commands/${file}`);
      commands.push(commandFile);
    });

    const newCommands = commands.sort((a, b) => {
      const aId = a.id;
      const bId = b.id;

      return aId - bId;
    });

    const commandsString = newCommands.map((item) => `+${item.name}: ${item.description}\n`);

    message.channel.send(
      `${userId}\`\`\`` +
      `${commandsString.join('')}` +
      `\`\`\``
    );
  },
});
