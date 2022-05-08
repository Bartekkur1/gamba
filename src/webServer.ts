import express, { Express } from 'express';
import { Services } from './types/services';
import { endpoints } from './endpoints/endpoints';
import cors from 'cors';
import logger from './util/logger';
import { config } from "./util/config";

export class WebServer {

    private server: Express;

    constructor(services: Services) {
        this.server = express();
        this.server.use(cors());

        logger.debug('Initializing web server...');

        for (let endpoint of endpoints) {
            const instance = new endpoint(services);
            instance.register(this.server);
        }

        this.server.use((req, res) => res.sendStatus(404));
    }

    start() {
        logger.debug('Starting web server...');
        this.server.listen(config.web.port, () => {
            logger.debug(`Web Server started on port ${config.web.port}`);
        });
    }

}