import { Message } from "discord.js";
import { Services } from "./services";

export type sendMessageFunc = (message: string) => Promise<void>;

export abstract class HandlerBase {

    protected services: Services;

    constructor(services) {
        this.services = services;
    }

    public abstract match(command: string): boolean;
    public abstract handle(message: Message, sendMessage: (message: string) => Promise<void>);
}