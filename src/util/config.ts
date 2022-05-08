import * as dotenv from 'dotenv';
import { Config } from "../types/config";

dotenv.config();

export const config: Config = {
    discord: {
        secret: process.env.DISCORD_SECRET,
        channel: process.env.GAMBA_CHANNEL,
        selfId: process.env.GAMBA_ID,
        admin: process.env.GAMBA_ADMIN
    },
    database: {
        database: process.env.POSTGRESQL_DATABASE,
        host: process.env.POSTGRESQL_HOST,
        password: process.env.POSTGRESQL_PASSWORD,
        port: parseInt(process.env.POSTGRESQL_PORT),
        user: process.env.POSTGRESQL_USER
    },
    web: {
        port: process.env.PORT
    }
};