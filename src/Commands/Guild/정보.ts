import { MessageEmbed } from 'discord.js';
import config from '../../Data/bot.config';
import { ICommand } from '../../Types';
import getDate from '../../Utils/getDate';

export const command: ICommand = {
  id: 2,
  name: '정보',
  description: `${config.name}의 정보를 보여줍니다.`,
  aliases: [],
  run: async (client, message) => {
    const embed = new MessageEmbed();

    embed
      .setTitle('DiceRoll 봇 에디션')
      .setAuthor(
        client.user.username,
        client.user.avatarURL({ dynamic: true, }),
        'https://thediceroll.github.io'
      )
      .setDescription('DiceRoll은 편하고 간단하게 주사위를 굴릴 수 있는 기능을 제공하는 봇입니다. 명령어는 ***+도움말*** 명령어를 치고 확인해보세요.\n')
      .setThumbnail(client.user.avatarURL({ dynamic: true, }))
      .addFields({
        name: '제작자',
        value: `[${client.config.author}](https://github.com/NIHILncunia)`,
        inline: true,
      }, {
        name: '버전',
        value: client.config.version,
        inline: true,
      }, {
        name: '최종수정일',
        value: getDate(new Date(client.config.lastUpdate)),
        inline: true,
      })
      .setColor('#bd0000');

    message.channel.send({ embeds: [ embed, ], });
  },
};
