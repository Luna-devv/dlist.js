import type { clientOptions } from '../typings/client';
import { WebServer } from './WebServer';
import { Client } from '../index';

/**
 * Create the internal client to manage events and more
 * @param {clientOptions} 
 * @see https://github.com/Luna-devv/dlist.js#readme
 * @example
 * new InternalClient(clientOptions);
 */
export class InternalClient {
    constructor(options: clientOptions, private client: Client) {
        this.id = options.bot;

        this.webhook = {};
        this.webhook.port = options.webhook.port;
        this.webhook.authorization = options.webhook.authorization;
        this.webhook.listenCallback = options.webhook.listenCallback;

        if (this.webhook.port && this.webhook.authorization) {
            this.webserver = new WebServer(this.webhook);
            this.webserver.registerPath('/', this.client).then(() => this.webserver.listen())
        };
    }

    public id;
    public webhook: any;
    private webserver;
};