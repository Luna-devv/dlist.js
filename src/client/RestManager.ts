import type { RestManagerOptions, RequestOption, RequestPayload } from '../typings/restManager';
/**
 * The internal request manager
 * @param {RestManagerOptions} options
 */
export class RestManager {
    constructor(options: RestManagerOptions) {
        this.token = `Bearer ${options.token}`;
        this.interval = options.interval;
    }

    private token;
    private interval;

    async get(options: RequestOption) {
        const data = await this.request('GET', options.path, options.payload, options.domain);
        return data;
    }

    async post(options: RequestOption) {
        const data = await this.request('POST', options.path, options.payload, options.domain);
        return data;
    }


    async put(options: RequestOption) {
        const data = await this.request('PUT', options.path, options.payload, options.domain);
        return data;
    }

    async request(method: string, path: string, payload: RequestPayload, domain: string) {

        let params = '';
        if (payload?.query) {

            let index = 1;

            for (const param of payload.query) {
                params += `${index === 1 ? '?' : '&'}${param.key}=${param.value}`;
                index++;
            }

        }

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                authorization: this.token
            },
            body: method === 'GET' ? undefined : JSON.stringify(payload?.body || {})
        };

        let res: Response;
        if (Number(process.versions.node.split('.')[0]) < 18) {
            const request = (await import('node-fetch')).default;
            if (!request) throw new Error('When using node <v18.x, you have to install node-fetch (npm install node-fetch) or update to a newer node.js version at https://nodejs.org');

            res = await request(`https://${domain || 'api'}.discordlist.gg/v0${path}${params}`, options)
                .catch((error: unknown) => {
                    throw new Error(error.toString());
                }) as unknown as Response;

        } else {
            res = await fetch(`https://${domain || 'api'}.discordlist.gg/v0${path}${params}`, options)
                .catch((error: unknown) => {
                    throw new Error(error.toString());
                });
        }
        const response = await res.json();

        switch (res.status) {
            case 200: {
                return response;
            }

            case 400: case 401: case 403: case 404: case 405: case 429: case 500: {
                throw new Error(response.message);
            }
        }

    }
}