import { Message } from "discord.js";
import { HandlerBase } from "../../types/handler";
import { config } from "../../util/config";

export class CancelBetHandler extends HandlerBase {
    match(command: string) {
        return /^!cancel_bet$/.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        if (message.author.id !== config.discord.admin) {
            await sendMessage('Only Gamba Admin can manage bets');
            return;
        }

        try {
            const { id, bets } = this.services.betManager.cancelBet();
            for (let bet of bets) {
                const { userId, coins } = bet;
                await this.services.user.increaseUserCoins(userId, coins);
            }
            await sendMessage(`
Bet ${id} was canceled!
Coins will be redistributed back to owners 💪
            `);
        } catch (err) {
            await sendMessage(err.message);
        }

        return;
    }
}