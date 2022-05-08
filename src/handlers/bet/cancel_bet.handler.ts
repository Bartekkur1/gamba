import { Message } from "discord.js";
import { HandlerBase } from "../../types/handler";
import logger from "../../util/logger";

export class CancelBetHandler extends HandlerBase {
    match(command: string) {
        return /^!cancel\sbet$/.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        try {
            const userId = message.author.id;
            const userBets = this.services.betManager.cancelUserBets(userId);

            for (let bet of userBets) {
                await this.services.user.increaseUserCoins(userId, bet.coins);
            }

            logger.debug(`User ${userId} canceled own bets`);
            await sendMessage(`
<@${userId}> your bets are canceled!
            `);
        } catch (err) {
            await sendMessage(err.message);
        }

        return;
    }
}