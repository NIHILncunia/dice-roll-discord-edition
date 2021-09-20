const { MessageEmbed, } = require('discord.js');
const Command = require('../Structures/Command');
const getDate = require('../utils/getDate');

module.exports = new Command({
  id: 2,
  name: '정보',
  description: 'DiceRoll에 대한 정보를 볼 수 있습니다.',
  async run(message, args, client) {
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
        value: `[${client.author}](https://github.com/NIHILncunia)`,
        inline: true,
      }, {
        name: '버전',
        value: client.version,
        inline: true,
      }, {
        name: '최종수정일',
        value: getDate(new Date(client.lastUpdate)),
        inline: true,
      })
      .setColor('#bd0000');

    message.channel.send({ embeds: [ embed, ], });
  },
});
