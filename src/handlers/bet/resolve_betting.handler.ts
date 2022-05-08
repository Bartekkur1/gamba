import { Message } from "discord.js";
import { HandlerBase } from "../../types/handler";
import { config } from "../../util/config";
import logger from "../../util/logger";
import drop from '../../../drop.json';

const regExp = /^!resolve\sbetting\s([0-9,]+)$/;

export class ResolveBettingHandler extends HandlerBase {
    match(command: string) {
        return regExp.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        if (message.author.id !== config.discord.admin) {
            await sendMessage('Only Gamba Admin can manage bets');
            return;
        }

        const [_, itemIds] = message.content.match(regExp);

        try {
            const bet = this.services.betManager.resolveBet();
            const itemsList = drop[bet.raid][bet.boss][bet.difficulty]
            const items = itemIds.split(',').map(id => itemsList[parseInt(id) - 1]);

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

            const printWinners = Object.keys(winnersTake).map(userId => `<@${userId}> won ${winnersTake[userId]}! \n`);

            logger.debug(`Bet ${bet.id} resolved`);
            await sendMessage(`
Bet on *${bet.raid} ${bet.boss} ${bet.difficulty}* resolved!
Total coins in pool to win: ${totalPool}
${printWinners.length > 0 ? 'Winners: ' : 'There was no winners this time!'}
${printWinners}
                    `);

            const userIds = Object.keys(winnersTake);
            for (let userId of userIds) {
                const coins = winnersTake[userId];
                await this.services.user.increaseUserCoins(userId, coins);
            }

            if (userIds.length > 0) {
                this.services.betManager.resetPool();
            }

        } catch (err) {
            await sendMessage(err.message);
        }

        return;
    }
}