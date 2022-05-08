import { Message } from "discord.js";
import { HandlerBase } from "../../types/handler";
import drop from '../../../drop.json';

export class RaidListHandler extends HandlerBase {
    match(command: string) {
        return /^!dungeons$/.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        await sendMessage(`
Currently supported raids:
${Object.keys(drop).map(key => key + '\n')}
        `)
        return;
    }
}