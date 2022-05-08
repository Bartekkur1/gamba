import { Message, TextChannel } from "discord.js";
import { HandlerBase } from "../../types/handler";

const regExp = /^!coins\s\<\@\!(\d+)\>$/;

export class UserCoinsHandler extends HandlerBase {
    match(command: string) {
        return regExp.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        try {
            const [_, user] = message.content.match(regExp);
            const userCoins = await this.services.user.getUserCoins(user);
            await sendMessage(`<@${user}> have ${userCoins} coins`);
        } catch (err) {
            await sendMessage(err.message);
        }
        return;
    }
}