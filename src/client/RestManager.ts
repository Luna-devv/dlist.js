import type { restManagerOptions, requestOption, requestPayload } from '../typings/restManager';

/**
 * The internal request manager
 * @param {restManagerOptions} 
 */
export class RestManager {
    constructor(options: restManagerOptions) {
        this.token = `Bearer ${options.token}`;
        this.interval = options.interval;
    }

    async put(options: requestOption) {
        const data = await this.request('PUT', options.path, options.payload);
        return data;
    }

    async request(method: string, path: string, payload: requestPayload) {
        let params = '';
        if (payload?.query) {
            let thisParamIs = 1;
            payload.query.forEach(param => {
                params += `${thisParamIs == 1 ? '?' : '&'}${param.key}=${param.value}`;
                thisParamIs++
            });
        };

        const res = await fetch(`https://api.discordlist.gg/v0${path}${params}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.token
            },
            body: JSON.stringify(payload?.body || {})
        }).catch(error => {
            throw new Error(error);
        });
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

    private token;
    private interval;
};