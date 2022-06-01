const { Client } = require('../dist');
require('dotenv').config();

const dlistAPI = new Client({
    token: process.env.token,
    bot: '857230367350063104'
});
dlistAPI.postGuilds(500);