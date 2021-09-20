import config from '../../Data/bot.config';
import { ICommand } from '../../Types';

export const command: ICommand = {
  id: 1,
  name: '핑',
  description: `${config.name}의 핑을 보여줍니다.`,
  aliases: [],
  run: async (client, message, args, userId) => {
    const Ping = client.ws.ping;
    message.channel.send(`${userId} 현재 ***${client.user.username}***의 핑은 ***${Ping}ms*** 입니다.`);
  },
};
