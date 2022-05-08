import { Message } from "discord.js";
import { HandlerBase } from "../../types/handler";
import { config } from "../../util/config";
import logger from "../../util/logger";

export class CancelBettingHandler extends HandlerBase {
    match(command: string) {
        return /^!cancel_betting$/.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        if (message.author.id !== config.discord.admin) {
            await sendMessage('Only Gamba Admin can manage bets');
            return;
        }

        try {
            const { id, bets, raid, boss, difficulty } = this.services.betManager.cancelBet();
            const userBets = bets.reduce((sum, bet) => {
                if (sum[bet.userId] === undefined) {
                    sum[bet.userId] = 0
                }
                sum[bet.userId] += bet.coins;
                return sum;
            }, {});

            for (let userId of Object.keys(userBets)) {
                const coins = userBets[userId];
                await this.services.user.increaseUserCoins(userId, coins);
            }

            logger.debug(`Bet ${id} was canceled`);
            await sendMessage(`
Bet *${raid} ${boss} ${difficulty}* was canceled!
Coins will be redistributed back to owners 💪
            `);
        } catch (err) {
            await sendMessage(err.message);
        }

        return;
    }
}