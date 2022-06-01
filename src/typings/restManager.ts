export type restManagerOptions = {
    token: string,
    interval: number
}

export type requestPayload = {
    body?: any,
    query?: { key: string, value: string | number }[]
}

export type requestOption = {
    path: string,
    payload: requestPayload
}
