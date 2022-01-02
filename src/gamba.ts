import { DiscordClient } from "./services/discord.client";
import { DatabaseClient } from "./services/db.client";
import { Message } from "discord.js";
import { config } from "./util/config";
import logger from "./util/logger";
import { createHandlers } from "./handlers/handlers";
import { Services } from "./types/services";
import { UserDao } from "./dao/user.dao";
import { HandlerBase } from "./types/handler";
import { BetManager } from "./services/bet.manager";

export class Gamba {

    private dcClient: DiscordClient;
    private dbClient: DatabaseClient;
    private services: Services;
    private handlers: HandlerBase[];

    constructor() {
        this.dbClient = new DatabaseClient();
        this.dcClient = new DiscordClient();
        this.services = {
            user: new UserDao(this.dbClient),
            betManager: new BetManager()
        }
    }

    async init() {
        this.handlers = createHandlers(this.services);
        for (let handler of this.handlers) {
            logger.debug(`Handler registered: ${handler.constructor.name}`);
        }
        await this.dcClient.start(this.handlers);
    }
}