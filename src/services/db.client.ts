import { Pool } from 'pg';
import { config } from '../util/config';

const { database } = config;

export class DatabaseClient {

    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            ...database,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }

    async getConnection() {
        return this.pool.connect();
    }

    async disconnect() {
        await this.pool.end();
    }
}