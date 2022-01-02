import queries from "../queries/user.query";
import { DatabaseClient } from "../services/db.client";
import { CountQueryResult, GetUserCoinsResult } from "../types/query";

export class UserDao {

    private dbClient: DatabaseClient;

    constructor(dbClient: DatabaseClient) {
        this.dbClient = dbClient;
    }

    async assertUserExists(id: string) {
        if (!await this.userExists(id)) {
            await this.createUserRecord(id);
        }
    }

    async userExists(id: string) {
        const connection = await this.dbClient.getConnection();
        const { rows } = await connection.query<CountQueryResult>(queries.selectUserQuery(id));
        connection.release();
        return rows[0].count === '1';
    }

    async createUserRecord(id: string) {
        const connection = await this.dbClient.getConnection();
        await connection.query(queries.createUserQuery(id));
        connection.release();
    }

    async getUserCoins(id: string): Promise<number> {
        await this.assertUserExists(id);
        const connection = await this.dbClient.getConnection();
        const { rows } = await connection.query<GetUserCoinsResult>(queries.getUserCoins(id));
        connection.release();
        return rows[0].coins;
    }

    async increaseUserCoins(id: string, amount: number) {
        await this.assertUserExists(id);
        const connection = await this.dbClient.getConnection();
        await connection.query<CountQueryResult>(queries.incrementUserCoins(id, amount));
        connection.release();
    }

    async decreaseUserCoins(id: string, amount: number) {
        await this.assertUserExists(id);
        const connection = await this.dbClient.getConnection();
        await connection.query<CountQueryResult>(queries.decrementUserCoins(id, amount));
        connection.release();
    }

}