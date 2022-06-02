import type { webServerOptions } from '../typings/webServer';

export type clientOptions = {
    token: string
    bot: string
    interval?: number
    webhook?: webServerOptions
}