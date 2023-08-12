import type { ClientOptions, DiscordlistBot, DiscordlistSearch } from './typings/client';

import { RestManager } from './client/RestManager';
import { WebServer } from './client/WebServer';

import { EventEmitter } from 'events';

/**
 * Create the client
 * @param {ClientOptions}
 * @see https://github.com/Luna-devv/dlist.js#readme
 * @example ```ts
 * const client = new Client({ token: 'xxx', bot: '857230367350063104' });
 * ```
 */
export class Client extends EventEmitter {
    constructor(options: ClientOptions) {
        super();
        this.token = options.token;
        this.id = options.bot;
        this.webhook = options.webhook;

        if (this.webhook?.port && this.webhook?.authorization) {
            this.webserver = new WebServer(this.webhook);
            this.webserver.registerPath('/', this).then(() => this.webserver.listen());
        }

        this.interval = options.interval ?? 6 * 60 * 1000;
        this.restManager = new RestManager({ token: this.token, interval: this.interval });
    }

    private token;
    public interval;
    public id;
    public webhook;
    private webserver;

    private restManager;

    /**
     * Post your bots guild count
     * @param {number} count
     * @see https://github.com/Luna-devv/dlist.js#readme
     * @example ```ts
     * // universal
     * client.postGuilds(500);
     * ```
     * @example ```ts
     * // discord.js
     * client.postGuilds(bot.guilds.cache.size);
     * ```
     * @example ```ts
     * // post at an interval (all 60 minutes)
     * setInterval(() => {
     *  client.postGuilds(bot.guilds.cache.size);
     * }, 1000 * 60 * 60);
     * ```
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
        }) as boolean;

        return data;
    }

    /**
     * Get bots from the website
     * @param {string} botId
     * @see https://github.com/Luna-devv/dlist.js#readme
     * @example ```ts
     * client.getBot("857230367350063104");
     * ```
    */
    async getBot(botId: string) {
        const data = await this.restManager.get({
            path: `/bots/${botId}`
        }) as DiscordlistBot;

        return data;
    }

    /**
     * Get users from the website
     * @param {string} userId
     * @see https://github.com/Luna-devv/dlist.js#readme
     * @example ```ts
     * client.getUser("821472922140803112");
     * ```
    */
    async getUser(userId: string) {
        const data = await this.restManager.get({
            path: `/users/${userId}`
        }) as DiscordlistBot;

        return data;
    }

    /**
     * Get bots from the website
     * @param {string} query
     * @see https://github.com/Luna-devv/dlist.js#readme
     * @example ```ts
     * client.search("waya", {
     *  limit: 30, // how many you want to get (optional)
     *  offset: 0, // how many it should skip (optional)
     *  sort: 'relevancy' | 'votes' | 'age' | 'trending' | 'popularity' | 'premium', // (optional)
     *  order: 'desc' | 'asc', // (optional)
     *  filter: {
     *      tags: [],  // tags - string array (optional)
     *      features: "<https://cdn.waya.one/r/1654875620.png>", // optional
     *      premium: false, // true or false (optional)
     *      filterMode: 'union' | 'intersection'  // idk (optional)
     *  }
     * });
     * ```
    */
    async search(query: string, options?: {
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
        }

        const filters: Record<string, unknown> = {};
        if (options?.filter?.tags) filters.tags = options.filter.tags;
        if (options?.filter?.features) filters.features = filterFeatures;
        if (options?.filter?.premium) filters.premium = options.filter.premium;
        if (options?.filter?.filterMode) filters.filterMode = options.filter.filterMode;

        const data = await this.restManager.post({
            path: '/bots/search',
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
        }) as DiscordlistSearch;

        return data?.hits || [];
    }

}