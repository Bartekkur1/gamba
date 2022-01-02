import { Message, TextChannel } from "discord.js";
import { HandlerBase } from "../../types/handler";

export class CoinsHandler extends HandlerBase {
    match(command: string) {
        return /^!coins$/.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        const userCoins = await this.services.user.getUserCoins(message.author.id);
        await sendMessage(`<@${message.author.id}> you have ${userCoins} coins`);
        return;
    }
}