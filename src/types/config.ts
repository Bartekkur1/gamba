export interface DiscordConfig {
    secret: string;
    channel: string;
    selfId: string;
    admin: string;
};

export interface DatabaseConfig {
    host: string;
    database: string;
    user: string;
    port: number;
    password: string;
}

export interface WebConfig {
    port: string;
}

export interface Config {
    discord: DiscordConfig;
    database: DatabaseConfig;
    web: WebConfig;
};