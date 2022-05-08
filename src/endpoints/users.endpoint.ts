import { Express } from "express";
import { EndpointBase } from "./types/EndpointBase";
import { ROUTE } from "./types/routes";

export class UsersEndpoint extends EndpointBase {

    register(express: Express): void {
        express.get(ROUTE.USERS, async (req, res) => {
            const users = await this.services.user.getAllUsersCoins();
            return res.json(users).status(200);
        });
    }

}