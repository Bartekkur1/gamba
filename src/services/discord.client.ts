import { Client, Intents, Message, TextChannel } from "discord.js";
import { HandlerBase } from "../types/handler";
import { config } from "../util/config";
import logger from "../util/logger";

export class DiscordClient {

    private channel: TextChannel;
    private client: Client;

    constructor() {
        this.client = new Client({
            intents: [Intents.FLAGS.GUILD_MESSAGES],
        });
    }

    public static isCommand(message: string) {
        return /^!.+/.test(message);
    }

    async start(handlers: HandlerBase[]) {
        this.client.on('ready', (client) => {
            logger.debug('Client is ready');
            client.channels.fetch(config.discord.channel)
                .then(channel => {
                    const textChannel = channel as TextChannel;
                    this.channel = textChannel;
                    logger.debug('Discord Client is ready!');
                });
        });

        logger.debug('Registering handlers');
        this.client.on('messageCreate', async (message) => {
            if (!DiscordClient.isCommand(message.content) || message.author.id === config.discord.selfId) return;
            logger.debug(`Handling command: "${message.content}"`);

            for (let handler of handlers) {
                if (handler.match(message.content)) {
                    logger.debug(`Handler matched: ${handler.constructor.name}`);
                    return handler.handle(message, (message: string) => this.sendMessage(message));
                }
            }

            logger.debug('Handler not found');
            await this.sendMessage(`Invalid command, try using !help`);
        });

        await this.client.login(config.discord.secret);
    }

    async sendMessage(message) {
        this.channel.send(message);
    }
};