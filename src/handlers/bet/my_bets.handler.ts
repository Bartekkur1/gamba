import { Message } from "discord.js";
import { HandlerBase } from "../../types/handler";

export class MyBetsHandler extends HandlerBase {
    match(command: string) {
        return /^!my\sbets$/.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        try {
            const userId = message.author.id;
            const userBets = this.services.betManager.getUserBets(userId);

            const betsSummary = userBets.reduce((sum, bet) => {
                sum += `${bet.coins} coins on item ${bet.item} \n`
                return sum;
            }, "")

            await sendMessage(`
<@${userId}> your bets:
${betsSummary}
            `);
        } catch (err) {
            await sendMessage(err.message);
        }

        return;
    }
}