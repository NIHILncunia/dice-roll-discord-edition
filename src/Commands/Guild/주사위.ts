import { MessageEmbed } from 'discord.js';
import { ICommand } from '../../Types';

export const command: ICommand = {
  id: 4,
  name: '주사위',
  description: 'DiceRoll에 대한 사용 가이드를 자세하게 볼 수 있습니다.',
  aliases: [],
  run: (client, message) => {
    const embed = new MessageEmbed();

    embed
      .setTitle('DiceRoll 사용 설명서')
      .setAuthor(
        client.user.username,
        client.user.avatarURL({ dynamic: true, }),
        'https://thediceroll.github.io'
      )
      .setDescription(
        `**DiceRoll 웹에 자세한 가이드가 존재하므로 [DiceRoll](https://thediceroll.github.io/) 링크를 전달합니다.**\n`
        + `*DiceRoll 디스코드 봇은 커스텀 주사위만을 다룹니다.*\n\n`
        + `**[ 웹 버전과 다른 부분 ]**\n`
        + `최댓값이나 최솟값으로 주사위를 굴리려면 \`+roll [min/max] [nDn]\`처럼\n`
        + `\`roll\` 명령어와 주사위식 사이에 \`min\`이나 \`max\`를 넣어주면 됩니다.`
      )
      .setColor('#bd0000');

    message.channel.send({ embeds: [ embed, ], });
  },
};
