import { Message } from "discord.js";
import { HandlerBase } from "../../types/handler";

export class RegisterHandler extends HandlerBase {
    match(command: string) {
        return /^!register$/.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        const { id, username } = message.author;

        try {
            await this.services.user.createUserIfNotExists(id, username);
            await sendMessage(`
<@${id}> welcome on gamba server!
            `);
        } catch (err) {
            await sendMessage(err.message);
        }
        return;
    }
}