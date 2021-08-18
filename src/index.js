const Client = require('./Structures/Client');
const config = require('../bot.config');

const { token, } = config;

const client = new Client();

client.start(token);
