import { Message } from "discord.js";
import { UserBet } from "../../types/bet";
import { HandlerBase } from "../../types/handler";
import drop from '../../../drop.json';

const regExp = /^!bet\s(\d+)\s(\d+)$/;

export class PlaceBetHandler extends HandlerBase {
    match(command: string) {
        return regExp.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        try {
            const userId = message.author.id;
            const [_, coins, itemIndex] = message.content.match(regExp);
            const userCoins = await this.services.user.getUserCoins(userId);
            if (userCoins < parseInt(coins)) {
                throw new Error('Not enought coins to place a bet!');
            }

            const { raid, difficulty, boss } = this.services.betManager.getLastBet();
            const item = drop[raid][boss][difficulty][parseInt(itemIndex) - 1];
            const userBet: UserBet = {
                userId,
                coins: parseInt(coins),
                item
            };

            this.services.betManager.placeBet(userBet);
            await this.services.user.decreaseUserCoins(userId, parseInt(coins));
            message.react('✅');
        } catch (err) {
            message.react('❌');
            await sendMessage(err.message);
        }

        return;
    }
}