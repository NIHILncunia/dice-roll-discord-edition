import { ICommand } from '../../Types';

export const command: ICommand = {
  id: 6,
  name: '계산',
  description: '간단한 계산을 해냅니다.',
  aliases: [],
  run: (client, message, args, userId) => {
    // eslint-disable-next-line no-new-func
    const Eval = (new Function(`return ${args[0]}`))();

    message.channel.send(`${userId} 계산 결과는 ***${Eval}*** 입니다.`);
  },
};
