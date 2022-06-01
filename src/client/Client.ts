import type { clientOptions } from '../typings/client';

/**
 * Create the Client
 * @param {clientOptions} 
 * @example
 * new Client({ token: 'xxx' });
 */
export class Client {
    constructor(options: clientOptions) {
        this.token = options.token;
    }

    private token;

    getToken() {
        return this.token;
    }
};