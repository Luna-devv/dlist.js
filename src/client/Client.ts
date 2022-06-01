import { EventEmitter } from 'events';
import type { clientOptions } from '../typings/client';
import { RestManager } from './RestManager';

/**
 * Create the Client
 * @param {clientOptions} 
 * @see https://github.com/Luna-devv/dlist.js#readme
 * @example
 * new Client({ token: 'xxx', bot: '857230367350063104' });
 */
export class Client extends EventEmitter {
    constructor(options: clientOptions) {
        super();
        this.token = options.token;
        this.interval = options.interval ?? 6 * 60 * 1000;
        this.id = options.bot;

        this.restManager = new RestManager({ token: this.token, interval: this.interval });
    }

    private token;
    public interval;
    private restManager;
    public id;

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