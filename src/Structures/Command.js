/* eslint-disable no-unused-vars */

const { Message, Interaction, } = require('discord.js');
const Client = require('./Client');

/**
 * @param {Message | Interaction} message
 * @param {string[]} args
 * @param {Client} client
 * @param {string} userId
 */
function RunFunction(message, args, client, userId) {}

class Command {
  /**
   * @typedef {{id: number, name: string, description: string, run: RunFunction}} CommandOptions
   * @param {CommandOptions} options
   */
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.description = options.description;
    this.run = options.run;
  }
}

module.exports = Command;
