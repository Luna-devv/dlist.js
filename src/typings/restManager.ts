export type RestManagerOptions = {
    token: string;
    interval: number;
}

export type RequestPayload = {
    body?: Record<string, unknown>;
    query?: { key: string, value: string | number }[];
}

export type RequestOption = {
    path: string;
    domain?: string;
    payload?: RequestPayload;
}