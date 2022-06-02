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
To get your token please visit [`https://discordlist.gg/bot/<BOT_ID>/dashboard/webhooks`](https://discordlist.gg/bot/<BOT_ID>/dashboard/webhooks) and look for the `Token` section.
```ts
import { Client } from 'dlist.js';
//js: const { Client } = require('dlist.js');

const client = new Client({
    token: 'xxx',
    bot: '857230367350063104',

    // if you want to use the voting webhook:
    webhook: {
        port: 3000,
        authorization: 'abc',
        listenCallback: () => console.log('web server ready')
    }
});
```

## Posting Guild data
To dispaly the count in how many guilds your bot is in
```ts
client.postGuilds(500);
```

## Voting webhook
If you use this, you have to add the `'webhook'` part in [#Create Client](#Create-Client) to be able to recieve events. In the next, head over to [`https://discordlist.gg/bot/<BOT_ID>/dashboard/webhooks`](https://discordlist.gg/bot/<BOT_ID>/dashboard/webhooks) again, and enter your servers IP and port in the `Webhook URl` field, as example: `http://123.456.78:3000`. In the `Webhook Authorization` field, create some strong key and treat it like a password, **the same** value has to be entered in the [`#Create Client`](#Create-Client)`.webhhok.authorization` in order to work!
```ts
client.on('vote', data => {
    console.log(data);
    /* {
        user: '857230367350063104',
        bot: '821472922140803112', 
        sTest: true
        }
    */
});

```
