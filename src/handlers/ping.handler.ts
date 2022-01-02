import { Message } from "discord.js";
import { HandlerBase } from "../types/handler";

export class PingHandler extends HandlerBase {
    match(command: string) {
        return /^!ping$/.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        await sendMessage('pong');
        return;
    }
}