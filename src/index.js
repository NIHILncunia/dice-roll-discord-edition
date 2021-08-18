const Client = require('./Structures/Client');
require('dotenv').config();

const client = new Client();

client.start(process.env.TOKEN);
