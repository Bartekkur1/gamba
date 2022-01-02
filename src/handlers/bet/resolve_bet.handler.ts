import { Message } from "discord.js";
import { HandlerBase } from "../../types/handler";
import { config } from "../../util/config";
import logger from "../../util/logger";

const regExp = /^!resolve_bet\n([a-zA-Z\s]+)/;

export class ResolveBetHandler extends HandlerBase {
    match(command: string) {
        return regExp.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        if (message.author.id !== config.discord.admin) {
            await sendMessage('Only Gamba Admin can manage bets');
            return;
        }

        const items = message.content.split(/\n/);
        items.shift();

        try {
            const bet = this.services.betManager.resolveBet();
            const totalPool = this.services.betManager.getPool();
            const winningBets = bet.bets.filter(bet => items.includes(bet.item));
            const winningPool = winningBets.flatMap(b => b.coins).reduce((prev, curr) => prev += curr, 0);

            const winnersSummed = winningBets.reduce((prev, curr) => {
                const { userId, coins } = curr;
                if (prev[userId] === undefined) {
                    prev[userId] = 0;
                }
                prev[userId] += coins;
                return prev;
            }, {});

            const winnersTake = Object.keys(winnersSummed).reduce((prev, curr) => {
                prev[curr] = (winnersSummed[curr] / winningPool) * totalPool;
                return prev;
            }, {});

            const printWinners = Object.keys(winnersTake).map(userId => `<@${userId}> placed ${winnersSummed[userId]} and won ${winnersTake[userId]}! \n`);

            await sendMessage(`
Bet ${bet.id} is resolved!
Coins to win: ${totalPool}
${printWinners.length > 0 ? 'Winners: ' : 'There was no winners this time!'}
${printWinners}
                    `);

            const userIds = Object.keys(printWinners);
            for (let userId of userIds) {
                const coins = winnersTake[userId];
                logger.debug(`transfering ${coins} to ${userId}`);
                await this.services.user.increaseUserCoins(userId, coins);
            }

        } catch (err) {
            await sendMessage(err.message);
        }

        return;
    }
}