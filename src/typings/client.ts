import type { WebserverOptions } from '../typings/webServer';

export interface ClientOptions {
    token: string
    bot: string
    interval?: number
    webhook?: WebserverOptions
}

export interface DiscordlistBot {
    flags: number;
    botId?: string;
    features: number;
    id: string;
    username: string;
    avatar: string;
    discriminator: number;
    prefix: string;
    isPackable: boolean;
    isHidden: boolean;
    isForcedIntoHiding: boolean;
    inviteUrl: string;
    webhookUrl?: string;
    webhookAuth?: string;
    websiteUrl: string;
    repoUrl: string;
    twitterUrl: string;
    instagramUrl: string;
    supportServerUrl: string;
    slug: string;
    tags: string[];
    createdOn: string;
    ownerId: string;
    coOwnerIds: string[];
    briefDescription: string;
    longDescription: string;
    guildCount: number;
    votes: number;
    allTimeVotes: number;
}

export interface DiscordlistSearch {
    hits: {
        avatar: string;
        briefDescription: string;
        coOwnerIds: string[];
        createdOn: string;
        discriminator: number;
        features: string;
        flags: string;
        guildCount: number;
        id: string;
        inviteUrl: string;
        ownerId: string;
        prefix: string;
        tags: string;
        username: string;
        votes: string;
    }[];
    limit: number;
    nbHits: number;
    offset: number;
    query: string;
    tagDistribution: Record<string, number>;
}

export interface DiscordlistUser {
    avatar?: string;
    banner?: string;
    bio?: string;
    bots: string[];
    claps: string;
    coOwnedBots: string[];
    coOwnedGuilds: string[];
    createdOn: string;
    /**
    *  @deprecated
    */
    discriminator: number;
    displayName?: string;
    flags: string;
    guilds: string[];
    id: string;
    packs: string[];
    slug?: string;
    username: string;
}