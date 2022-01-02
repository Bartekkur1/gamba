import { Message, TextChannel } from "discord.js";
import { HandlerBase } from "../../types/handler";
import { config } from "../../util/config";

const regExp = /^!remove_coins\s\<\@\!(\d+)\>\s(\d+)/;

export class RemoveCoinsHandler extends HandlerBase {
    match(command: string) {
        return regExp.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => void) {
        if (message.author.id !== config.discord.admin) {
            await sendMessage('Only Gamba Admin can manage coins');
        } else {
            const [_, name, amount] = message.content.match(regExp);
            await this.services.user.decreaseUserCoins(name, parseInt(amount));
            await message.react('✅');
            await sendMessage(`<@${name}> lost ${amount} coins`);
        }
        return;
    }
}