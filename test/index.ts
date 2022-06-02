import { Client } from '../dist';
require('dotenv').config();

const dlistAPI = new Client({
    token: process.env.token || '',
    bot: '857230367350063104',
    webhook: {
        port: 3000,
        authorization: 'abc',
        listenCallback: () => console.log('web server ready')
    }
});

dlistAPI.on('vote', data => {
    console.log(data);
});

dlistAPI.on('invalidVoteRequest', data => {
    console.log(data.headers);
});