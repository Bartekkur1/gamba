import queries from "../queries/user.query";
import { DatabaseClient } from "../services/db.client";
import { CountQueryResult, GetUserCoinsQueryResult, GetUserQueryResult } from "../types/query";
import logger from "../util/logger";

export class UserDao {

    private dbClient: DatabaseClient;

    constructor(dbClient: DatabaseClient) {
        this.dbClient = dbClient;
    }

    async createUserIfNotExists(id: string, username: string) {
        if (!await this.userExists(id)) {
            await this.createUserRecord(id, username);
        } else {
            throw new Error(`<@${id}> you are already registered!`);
        }
    }

    async assertUserExists(id: string) {
        if (!await this.userExists(id)) {
            throw new Error(`<@${id}> you are not registered, use !register to become a Gamba user`);
        }
    }

    async userExists(id: string) {
        const connection = await this.dbClient.getConnection();
        const { rows } = await connection.query<CountQueryResult>(queries.selectUserQuery(id));
        connection.release();
        return rows[0].count === '1';
    }

    async createUserRecord(id: string, username: string) {
        const connection = await this.dbClient.getConnection();
        await connection.query(queries.createUserQuery(id, username));
        connection.release();
    }

    async getUserCoins(id: string): Promise<number> {
        const connection = await this.dbClient.getConnection();
        await this.assertUserExists(id);
        const { rows } = await connection.query<GetUserCoinsQueryResult>(queries.getUserCoins(id));
        connection.release();
        return rows[0].coins;
    }

    async getAllUsersCoins(): Promise<GetUserQueryResult[]> {
        const connection = await this.dbClient.getConnection();
        const result = await connection.query<GetUserQueryResult>(queries.getAllUsers());
        return result.rows
    }

    async increaseUserCoins(id: string, amount: number) {
        await this.assertUserExists(id);
        logger.debug(`Increasing user ${id} coins by ${amount}`);
        const connection = await this.dbClient.getConnection();
        await connection.query<CountQueryResult>(queries.incrementUserCoins(id, amount));
        connection.release();
    }

    async decreaseUserCoins(id: string, amount: number) {
        await this.assertUserExists(id);
        logger.debug(`Decreasing user ${id} coins by ${amount}`);
        const connection = await this.dbClient.getConnection();
        await connection.query<CountQueryResult>(queries.decrementUserCoins(id, amount));
        connection.release();
    }

}