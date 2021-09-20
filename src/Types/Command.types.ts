import { Message } from 'discord.js';
import Client from '../Client';

interface Run {
  // eslint-disable-next-line no-unused-vars
  (client: Client, message: Message, args: string[], userId: string);
}

export interface ICommand {
  id: number;
  name: string;
  description?: string;
  aliases?: string[];
  run: Run;
}

export interface Roll {
  diceBox: string[][],
  rollBox: (number[] | number [][]),
  rollTotal: number[],
}
