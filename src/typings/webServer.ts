export type webServerOptions = {
    port: number
    authorization: string
    listenCallback?: () => void;
}