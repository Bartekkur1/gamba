import { Message } from "discord.js";
import { HandlerBase } from "../../types/handler";
import drop from '../../../drop.json';

const regExp = /^!dungeon\sbosses\s([a-zA-Z]+)$/;

export class BossListHandler extends HandlerBase {
    match(command: string) {
        return regExp.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {

        const [_, raid] = message.content.match(regExp);

        const bosses = Object.keys(drop[raid]).reduce((prev, curr) => {
            prev += `> ${curr} \n`
            return prev;
        }, "");

        await sendMessage(`
${raid} bosses:
${bosses}
        `)
        return;
    }
}