import { DiscordClient } from "./services/discord.client";
import { DatabaseClient } from "./services/db.client";
import logger from "./util/logger";
import { createHandlers } from "./handlers/handlers";
import { Services } from "./types/services";
import { UserDao } from "./dao/user.dao";
import { HandlerBase } from "./types/handler";
import { BetManager } from "./services/bet.manager";
import { WebServer } from "./webServer";

export class Gamba {

    private dcClient: DiscordClient;
    private dbClient: DatabaseClient;
    private services: Services;
    private handlers: HandlerBase[];
    private webServer: WebServer;

    constructor() {
        this.dbClient = new DatabaseClient();
        this.dcClient = new DiscordClient();
        this.services = {
            user: new UserDao(this.dbClient),
            betManager: new BetManager()
        }
        this.webServer = new WebServer(this.services);
    }

    async init() {
        this.handlers = createHandlers(this.services);
        for (let handler of this.handlers) {
            logger.debug(`Handler registered: ${handler.constructor.name}`);
        }
        await this.dcClient.start(this.handlers);
        await this.webServer.start();
    }
}