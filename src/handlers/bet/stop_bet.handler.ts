import { Message } from "discord.js";
import { HandlerBase } from "../../types/handler";
import { config } from "../../util/config";

export class StopBetHandler extends HandlerBase {
    match(command: string) {
        return /^!stop_bet$/.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        if (message.author.id !== config.discord.admin) {
            await sendMessage('Only Gamba Admin can manage bets');
            return;
        }

        try {
            const lastBet = this.services.betManager.stopBet();
            await sendMessage(`
Beting on ${lastBet.id} stoped!
            `);
        } catch (err) {
            await sendMessage(err.message);
        }

        return;
    }
}