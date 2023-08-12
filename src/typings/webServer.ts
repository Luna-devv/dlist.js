export type WebserverOptions = {
    port: number
    authorization: string
    listenCallback?: () => void;
}