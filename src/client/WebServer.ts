import type { webServerOptions } from '../typings/webServer';
import { Client } from '../index';

import express from 'express';
import jwt from 'jsonwebtoken';

/**
 * The internal webserver manager for incoming webhook requests
 * @param {webServerOptions} 
 * @example
 * new WebServer(webServerOptions);
 */
export class WebServer {
    constructor(options: webServerOptions) {
        this.port = options.port;
        this.authorization = options.authorization;
        this.listenCallback = options.listenCallback;

        this.app = express();
    }

    private port;
    private authorization;
    public app;
    private listenCallback;

    /**
     * Start listening to the port
     * @param {type path:string, client: Client}
     * @example
     * webServer.registerPath('/');
     */
    async registerPath(path: string, client: Client) {
        this.app.use(express.text());

        this.app.post(path, (req: express.Request, res: express.Response) => {

            let decoded;
            try {
                decoded = jwt.verify(req.body, this.authorization);
            } catch (e) {
                client.emit('invalidVoteRequest', req);
            };

            client.emit('vote', decoded);
            res.status(200).json({
                status: 200,
                message: 'Successfully emited vote'
            });
        });

        this.app.all('*', (req: express.Request, res: express.Response) => {
            res.status(404).json({
                status: 404,
                message: 'This end-point does not exist or method is not in use'
            });
        })
    }

    /**
     * Start listening to the port
     * @param undefined
     * @example
     * webServer.listen();
     */
    listen() {
        this.app.use((req: express.Request, res: express.Response, next: any) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST');
            res.setHeader('Access-Control-Allow-Headers', '*');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });

        this.app.listen(this.port, this.listenCallback);
        return true;
    }
};