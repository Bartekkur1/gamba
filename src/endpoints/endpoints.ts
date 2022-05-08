import { HealthEndpoint } from './health.endpoint';
import { StatusEndpoint } from './status.endpoint';
import { UsersEndpoint } from './users.endpoint';

export const endpoints = [
    HealthEndpoint,
    UsersEndpoint,
    StatusEndpoint
];