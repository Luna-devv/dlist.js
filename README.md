## About
This is an unofficial [discordlist.gg]() package written for **Typecript and JavaScript** to interact with its public API. If you need help using this package, join the **maintainer's [Support Server](https://discord.com/invite/yYd6YKHQZH)**, if you need help with the website or the raw API, join the **official [Support Server](https://discord.gg/GSRYbjFpvn)** and ask friendly there.

All examples are written for **TypeScript**, if you use **JavaScript**, please use the comment one line below __instead__.

## Install
Download this [npm package](https://www.npmjs.com/package/dlist.js) to use in your project with

```bash
npm install dlist.js
## or
yarn add dlist.js
```

## Create Client
To be able to interact with the api, you have to create a client, in the client's option you have to provide the [discordlist.gg]()-token. <br />
`https://discordlist.gg/bot/<BOT_ID>/dashboard/webhooks`
```ts
import { Client } from 'dlist.js';
//js: const { Client } = require('dlist.js');

const client = new Client({
    token: process.env.dlist_token,
    bot: '857230367350063104'
});

client.postGuilds(500);
```