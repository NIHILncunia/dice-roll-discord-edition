import { MessageEmbed } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import { ICommand } from '../../Types';

interface ImportType {
  command?: ICommand;
}

export const command: ICommand = {
  id: 3,
  name: '도움말',
  description: 'DiceRoll이 지원하는 명령어의 설명을 볼 수 있습니다.',
  aliases: [],
  run: (client, message) => {
    const commandBox: ICommand[] = [];
    const embed = new MessageEmbed();

    const commandPath = path.join(__dirname, '..', '..', 'Commands');
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts'));

      for (const file of commands) {
        const { command, }: ImportType = require(`${commandPath}/${dir}/${file}`);
        commandBox.push(command);
      }
    });

    const newCommands = commandBox.sort((a, b) => {
      const aId = a.id;
      const bId = b.id;

      return aId - bId;
    });

    const commandsString = newCommands.map((item) => `* +**${item.name}** → ${item.description}\n`);

    embed
      .setTitle('DiceRoll 도움말')
      .setAuthor(
        client.user.username,
        client.user.avatarURL({ dynamic: true, }),
        'https://thediceroll.github.io'
      )
      .setDescription(commandsString.join(''))
      .setColor('#bd0000');

    message.channel.send({ embeds: [ embed, ], });
  },
};
