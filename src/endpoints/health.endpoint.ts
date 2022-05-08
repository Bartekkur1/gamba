import { Express } from "express";
import { EndpointBase } from "./types/EndpointBase";
import { ROUTE } from "./types/routes";

export class HealthEndpoint extends EndpointBase {

    register(express: Express): void {
        express.get(ROUTE.HEALTH, (req, res) => {
            return res.sendStatus(200);
        });
    }

}