import { Message } from "discord.js";
import { HandlerBase } from "../../types/handler";
import { config } from "../../util/config";
import logger from "../../util/logger";

export class StopBettingHandler extends HandlerBase {
    match(command: string) {
        return /^!stop\sbetting$/.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        if (message.author.id !== config.discord.admin) {
            await sendMessage('Only Gamba Admin can manage bets');
            return;
        }

        try {
            const { raid, difficulty, boss, bets, id } = this.services.betManager.stopBet();

            const placedBets = bets.reduce((prev, { userId, coins, item }) => {
                prev += `<@${userId}> betted ${coins} coins on ${item} \n`;
                return prev;
            }, '');

            logger.debug(`Betting on ${id} stopped`);
            await sendMessage(`
Beting on ${raid} ${difficulty} ${boss} stoped!
${placedBets.length > 0 ? "Placed bets:" : "There was no bets placed!"}
${placedBets}
            `);
        } catch (err) {
            await sendMessage(err.message);
        }

        return;
    }
}