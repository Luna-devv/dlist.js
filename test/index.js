"use strict";
exports.__esModule = true;
var promises_1 = require("fs/promises");
var dist_1 = require("../dist");
require('dotenv').config();
var dlistAPI = new dist_1.Client({
    token: process.env.token || '',
    bot: '857230367350063104'
});
dlistAPI.on('vote', function (data) {
    console.log(data);
});
dlistAPI.on('invalidVoteRequest', function (data) {
    console.log(data.headers);
});
dlistAPI.getUser('821472922140803112').then(function (r) {
    (0, promises_1.writeFile)('res.json', JSON.stringify(r, null, 5));
});
