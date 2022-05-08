import { Message } from "discord.js";
import { UserBet } from "../../types/bet";
import { HandlerBase } from "../../types/handler";
import drop from '../../../drop.json';
import logger from "../../util/logger";

const regExp = /^!bet\s(\d+)\s(\d+)$/;

export class PlaceBetHandler extends HandlerBase {
    match(command: string) {
        return regExp.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        try {
            const userId = message.author.id;
            const { raid, difficulty, boss, id } = this.services.betManager.getLastBet();
            const [_, coins, itemIndex] = message.content.match(regExp);
            const item = drop[raid][boss][difficulty][parseInt(itemIndex) - 1];

            if (parseInt(coins) === 0) {
                throw new Error('Invalid coins amount!');
            }

            const userBets = this.services.betManager.getUserBets(userId);
            const userBetsItems = userBets.reduce((sum, bet) => {
                sum[bet.item] = 0;
                return sum;
            }, {});

            const itemNames = Object.keys(userBetsItems);
            if (!itemNames.includes(item) && Object.keys(userBetsItems).length === 2) {
                throw new Error(`<@${userId}> you've reached bet placed limit!`);
            }

            const userCoins = await this.services.user.getUserCoins(userId);
            if (userCoins < parseInt(coins)) {
                throw new Error('Not enought coins to place a bet!');
            }


            const userBet: UserBet = {
                userId,
                coins: parseInt(coins),
                item
            };

            this.services.betManager.placeBet(userBet);
            await this.services.user.decreaseUserCoins(userId, parseInt(coins));
            logger.debug(`User ${userId} placed ${coins} coins on bet ${id}`);
            message.react('✅');
        } catch (err) {
            message.react('❌');
            await sendMessage(err.message);
        }

        return;
    }
}