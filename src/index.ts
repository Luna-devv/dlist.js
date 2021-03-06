import type { clientOptions } from './typings/client';
import { InternalClient } from './client/InternalClient';
import { RestManager } from './client/RestManager';

import { EventEmitter } from 'events';
import { features } from 'process';

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
     * @param {number} count
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

    /**
     * Get bots from the website
     * @param {string} bot 
     * @see https://github.com/Luna-devv/dlist.js#readme
     * @example
     * client.getBot("857230367350063104");
    */
    async getBot(bot: string) {
        const data = await this.restManager.get({
            path: `/bots/${this.id}`
        });
        return data;
    }

    /**
     * Get bots from the website
     * @param {string} query 
     * @see https://github.com/Luna-devv/dlist.js#readme
     * @example
     * client.getBot("857230367350063104");
    */
    async search(query?: string, options?: {
        limit?: number
        offset?: number
        filter?: {
            tags?: string[]
            features?: string[]
            premium: boolean
            filterMode?: 'union' | 'intersection'
        }
        sort?: 'relevancy' | 'votes' | 'age' | 'trending' | 'popularity' | 'premium'
        order?: 'desc' | 'asc'
    }) {

        let filterFeatures = 0;
        if (options?.filter?.features) {
            if (options.filter.features.includes('prefix')) filterFeatures += 1 << 0;
            if (options.filter.features.includes('language')) filterFeatures += 1 << 1;
            if (options.filter.features.includes('commands')) filterFeatures += 1 << 2;
            if (options.filter.features.includes('dashboard')) filterFeatures += 1 << 3;
            if (options.filter.features.includes('slashCommands')) filterFeatures += 1 << 4;
            if (options.filter.features.includes('paidFeatures')) filterFeatures += 1 << 5;
            if (options.filter.features.includes('documentation')) filterFeatures += 1 << 6;
            if (options.filter.features.includes('interactiveButtons')) filterFeatures += 1 << 7;
        };

        let filters: any = {};
        if (options?.filter?.tags) filters.tags = options.filter.tags;
        if (options?.filter?.features) filters.features = filterFeatures;
        if (options?.filter?.premium) filters.premium = options.filter.premium;
        if (options?.filter?.filterMode) filters.filterMode = options.filter.filterMode;

        const data = await this.restManager.post({
            path: `/bots/search`,
            domain: 'search',
            payload: {
                body: {
                    query: query || '*',
                    limit: options?.limit ?? 21,
                    offset: options?.offset ?? 0,
                    sort: options?.sort || 'trending',
                    order: options?.order || 'desc',
                    filter: filters
                }
            }
        });
        return data?.hits || [];
    }
};