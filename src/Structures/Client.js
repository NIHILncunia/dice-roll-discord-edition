/* eslint-disable no-unused-vars */

const { readdirSync, } = require('fs');
const { Client, Intents, Collection, } = require('discord.js');
const Command = require('./Command');
const Event = require('./Event');
const config = require('../../bot.config');

const { prefix, version, author, } = config;

// 봇이 모든 기능을 수행할 수 있게 만든다.
const intents = new Intents(32767);

// 클라이언트를 확장해서 원하는 기능을 추가한다.
class DiceRoll extends Client {
  constructor(options) {
    super({ intents, });
    /**
     * @type {Collection<string, Command>}
    */
    // 명령어 기능을 추가한다.
    this.commands = new Collection();

    /**
     * @type {string}
     */
    this.prefix = prefix;
    this.version = version;
    this.author = author;
  }

  /**
   * @param {string} token
   */
  start(token) {
    // 명령어 핸들러
    readdirSync('./src/Commands').filter((file) => file.endsWith('.js')).forEach((file) => {
      /**
       * @type {Command}
      */
      const command = require(`../Commands/${file}`);

      // 명령어가 로드되는 구간
      console.log(`[명령어] \`${command.name}\` 로드.`);
      this.commands.set(command.name, command);
    });

    // 이밴트 핸들러
    readdirSync('./src/Events').filter((file) => file.endsWith('.js')).forEach((file) => {
      /**
       * @type {Event}
       */
      const event = require(`../Events/${file}`);

      // 이벤트가 로드되는 구간
      console.log(`[이벤트] \`${event.event}\` 로드.`);
      this.on(event.event, event.run.bind(null, this));
    });

    // 봇이 온라인임
    this.login(token);
  }
}

module.exports = DiceRoll;
