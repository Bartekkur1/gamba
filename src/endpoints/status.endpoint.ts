import { Express } from "express";
import { EndpointBase } from "./types/EndpointBase";
import { ROUTE } from "./types/routes";

enum Command {
    START = "start",
    STOP = "stop",
    CANCEL = "cancel",
    RESOLVE = "resolve"
};

export class StatusEndpoint extends EndpointBase {

    register(express: Express): void {
        express.get(ROUTE.STATUS, (req, res) => {
            try {
                const lastBet = this.services.betManager.getLastBet();
                return res.json(lastBet).status(200);
            } catch (err) {
                return res.json(this.errorMessage(err.message)).status(400);
            }
        });

        express.post(ROUTE.COMMAND, async (req, res) => {
            const { command } = req.params;

            switch (command as Command) {
                case Command.START:
                default:
                    return res.sendStatus(200);
            }
        });
    }

}