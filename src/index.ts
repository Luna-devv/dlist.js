import type { clientOptions } from './typings/client';
import { InternalClient } from './client/InternalClient';
import { RestManager } from './client/RestManager';

import { EventEmitter } from 'events';

/**
 * Create the client
 * @param {clientOptions} 
 * @see https://github.com/Luna-devv/dlist.js#readme
 * @example
 * new Client({ token: 'xxx', bot: '857230367350063104' });
 */
export class Client extends EventEmitter {
    constructor(options: clientOptions) {
        super();
        this.internalClient = new InternalClient(options, this);
        this.token = options.token;
        this.id = options.bot;

        this.interval = options.interval ?? 6 * 60 * 1000;
        this.restManager = new RestManager({ token: this.token, interval: this.interval });
    }

    private internalClient;
    private token;
    public interval;
    public id;
    public webhook: any;

    private restManager;

    /**
     * Post your bots guild count
     * @param {type count: number} 
     * @see https://github.com/Luna-devv/dlist.js#readme
     * @example
     * client.postGuilds(500);
     */
    async postGuilds(count: number) {
        const data = await this.restManager.put({
            path: `/bots/${this.id}/guilds`,
            payload: {
                query: [
                    {
                        key: 'count',
                        value: count
                    }
                ]
            }
        });
        return data;
    }
};