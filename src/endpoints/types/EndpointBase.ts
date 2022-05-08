import { Express } from 'express';
import { Services } from '../../types/services';

export abstract class EndpointBase {

    protected services: Services;

    constructor(services: Services) {
        this.services = services;
    }

    errorMessage(message: string) {
        return {
            'error': message
        };
    }

    abstract register(express: Express): void;
}