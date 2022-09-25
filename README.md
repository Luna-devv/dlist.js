[![](https://img.shields.io/discord/828676951023550495?color=5865F2&logo=discord&logoColor=white)](https://lunish.nl/support)
![](https://img.shields.io/npm/dt/dlist.js.svg?maxAge=3600)
![](https://img.shields.io/npm/v/dlist.js?maxAge=3600)
## About
This is an unofficial [discordlist.gg]() package written for **Typecript and JavaScript** to interact with its public API.
This lib can be used with any discord framework (or without any), for example with `discord.js` and `eirs`.

If you need help using this package, join the **[dlist.js Support Server](https://discord.com/invite/yYd6YKHQZH)**.
If you need help with the website or the raw API, join the **[dlist.gg Support Server](https://discord.gg/GSRYbjFpvn)** and ask friendly there.

All examples are written for **TypeScript**, if you use **JavaScript** please use the commonJS import method.

## Install
Download this [npm package](https://www.npmjs.com/package/dlist.js) to use in your project with the following commands:

If you run **node.js v18 or higher**, use
```bash
# With npm
npm install dlist.js
# With yarn
yarn add dlist.js
```

For **node.js v17 or lower**, use
```bash
# With npm
npm install dlist.js node-fetch@2
# With yarn
yarn add dlist.js node-fetch@2
```

## Getting API Token
To be able to interact with the api, you have to create a client, in the client's option you have to provide the [discordlist.gg]()-token. <br />

To get your token please visit [`https://discordlist.gg/bot/<BOT_ID>/dashboard/webhooks`](https://discordlist.gg/bot/<BOT_ID>/dashboard/webhooks) and look for the `Token` section.

## Create Client
```ts
/* ES6 */
import { Client } from 'dlist.js';
// import { Client as dlistClient } from 'dlist.js';

/* commonJS */
const { Client } = require('dlist.js');
// const { Client: dlistClient } = require('dlist.js');

const client = new Client({
    token: 'xxx',
    bot: '857230367350063104',

    /* If using voting webhook (optional) */
    webhook: {
        port: 3000,
        authorization: 'abc',
        listenCallback: () => console.log('web server ready')
    }
});
```

## Posting Guild data
Send your bot's server count stats to dlist.gg api so it can be displayed for your bot on the website!
If you're using for example `discord.js`, replace `500` with `client.guilds.cache.size`. If you're using any other package, please read their docs or ask the package maintainers.
```ts
client.postGuilds(500);
```

## Voting webhook
If you use this, you have to add the `'webhook'` part in [#Getting API Token](#Getting-API-Token) to be able to recieve events.

Next, head over to [`https://discordlist.gg/bot/<BOT_ID>/dashboard/webhooks`](https://discordlist.gg/bot/<BOT_ID>/dashboard/webhooks) again and enter your server's IP and Port in the `Webhook URl` field, for example: `http://123.456.78:3000`.

In the `Webhook Authorization` field, create a strong key and treat it like a password, **the same** value has to be entered in the [`#Create Dlist Client`](#Create-Dlist-Client)`.webhook.authorization` in order to work!
```ts
client.on('vote', data => {
    console.log(data);
    /*
        {
            user_id: '857230367350063104',
            bot_id: '821472922140803112', 
            is_test: true
        }
    */
});

```
