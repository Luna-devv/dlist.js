import type { restManagerOptions, requestOption, requestPayload } from '../typings/restManager';
/**
 * The internal request manager
 * @param {restManagerOptions} options
 */
export class RestManager {
    constructor(options: restManagerOptions) {
        this.token = `Bearer ${options.token}`;
        this.interval = options.interval;
    }

    private token;
    private interval;

    async get(options: requestOption) {
        const data = await this.request('GET', options.path, options.payload, options.domain);
        return data;
    }

    async post(options: requestOption) {
        const data = await this.request('POST', options.path, options.payload, options.domain);
        return data;
    }


    async put(options: requestOption) {
        const data = await this.request('PUT', options.path, options.payload, options.domain);
        return data;
    }

    async request(method: string, path: string, payload: requestPayload, domain: string) {
        let params = '';
        if (payload?.query) {
            let thisParamIs = 1;
            payload.query.forEach(param => {
                params += `${thisParamIs == 1 ? '?' : '&'}${param.key}=${param.value}`;
                thisParamIs++
            });
        };

        let res:any='';
        if (Number(process.versions.node.split('.')[0]) == 18) {
            const request = require('node-fetch')
            res = await request(`https://${domain || 'api'}.discordlist.gg/v0${path}${params}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: this.token
                },
                body: method == 'GET' ? undefined : JSON.stringify(payload?.body || {})
            }).catch((error: any) => {
                throw new Error(error);
            });
        } else {
            res = await fetch(`https://${domain || 'api'}.discordlist.gg/v0${path}${params}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: this.token
                },
                body: method == 'GET' ? undefined : JSON.stringify(payload?.body || {})
            }).catch((error: any) => {
                throw new Error(error);
            });
        };
        const response = await res.json();

        switch (res.status) {
            case 200: {
                return response;
            }

            case 400: case 401: case 403: case 404: case 405: case 429: case 500: {
                throw new Error(response.message)
            }
        }
    }
};