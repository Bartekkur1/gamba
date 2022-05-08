import { Message } from "discord.js";
import { HandlerBase } from "../../types/handler";

export class BetPoolHandler extends HandlerBase {
    match(command: string) {
        return /^!pool$/.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        const pool = this.services.betManager.getPool();

        await sendMessage(`Winning pool is ${pool}!`);

        return;
    }
}