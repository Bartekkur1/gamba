import { Message, TextChannel } from "discord.js";
import { HandlerBase } from "../../types/handler";
import { config } from "../../util/config";

const regExp = /^!add_coins\s\<\@\!(\d+)\>\s(\d+)/;

export class AddCoinsHandler extends HandlerBase {

    public match(command: string): boolean {
        return regExp.test(command);
    }

    async handle(message: Message, sendMessage: (message: string) => Promise<void>) {
        if (message.author.id !== config.discord.admin) {
            await sendMessage('Only Gamba Admin can manage coins');
        } else {
            const [_, name, amount] = message.content.match(regExp);
            await this.services.user.increaseUserCoins(name, parseInt(amount));
            await message.react('✅');
            await sendMessage(`<@${name}> recived ${amount} coins`);
        }
        return;
    }
}