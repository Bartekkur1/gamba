import { Message } from "discord.js";
import { HandlerBase } from "../../types/handler";
import { v4 } from 'uuid';
import { Bet, BetStatus } from "../../types/bet";
import drop from '../../../drop.json';
import { config } from "../../util/config";

const regExp = /^!start_bet\s([a-zA-Z]+)\s(\d+)\s([a-zA-Z\s']+)$/;

export class StartBetHandler extends HandlerBase {
    match(command: string) {
        return regExp.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        if (message.author.id !== config.discord.admin) {
            await sendMessage('Only Gamba Admin can manage bets');
            return;
        }

        const [_, raid, difficulty, boss] = message.content.match(regExp);

        const betStart = new Date().getTime();
        const bet: Bet = {
            id: v4(),
            boss,
            raid,
            difficulty,
            status: BetStatus.PENDING,
            start: betStart,
            bets: []
        };

        try {
            this.services.betManager.startBet(bet);
            const bossDrop = drop[raid][boss][difficulty].reduce((prev, curr) => {
                prev += `> ${curr} \n`
                return prev;
            }, "");

            await sendMessage(`
Bet ${raid} ${difficulty} on ${boss} started!
ID: ${bet.id}
Start Date: ${new Date(bet.start).toISOString().replace('T', ' ').split('.')[0]}
Boss Drop:
${bossDrop}
Place your bets!
            `);
        } catch (err) {
            await message.react('😔');
            await sendMessage(err.message);
        }

        return;
    }
}