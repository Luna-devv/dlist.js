import { writeFile } from 'fs/promises';
import { Client } from '../dist';
require('dotenv').config();

const dlistAPI = new Client({
    token: process.env.token || '',
    bot: '857230367350063104',
});

dlistAPI.on('vote', (data) => {
    console.log(data);
});

dlistAPI.on('invalidVoteRequest', (data) => {
    console.log(data.headers);
});

dlistAPI.getUser('821472922140803112').then((r) => {
    writeFile('res.json', JSON.stringify(r, null, 5));
});