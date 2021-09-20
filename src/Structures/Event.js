const Discord = require('discord.js');
const Client = require('./Client');

/**
 * @template {keyof Discord.ClientEvents} K
 * @param {Client} client
 * @param {Discord.ClientEvents[K]} eventArgs
 */
function runFunction(client, ...eventArgs) { }

/**
 * @template {keyof Discord.ClientEvents} K
 */
class Event {
  /**
   * @param {K} event
   * @param {runFunction<K>} runFunction
   */
  constructor(event, runFunction) {
    this.event = event;
    this.run = runFunction;
  }
}

module.exports = Event;
