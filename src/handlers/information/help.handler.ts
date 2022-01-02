import { Message } from "discord.js";
import { HandlerBase } from "../../types/handler";

export class HelpHandler extends HandlerBase {
    match(command: string) {
        return /^!help$/.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        await sendMessage('Sadge');
        return;
    }
}