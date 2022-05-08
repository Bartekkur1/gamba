import { DatabaseClient } from "./src/services/db.client";

const userTable = `
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    userId varchar(36) NOT NULL,
    userName varchar(64) NOT NULL,
    coins integer NOT NULL DEFAULT '0',
    PRIMARY KEY (userId)
  )
`;


(async () => {
  const dbClient = new DatabaseClient();
  const connection = await dbClient.getConnection();

  await connection.query(userTable);

  await connection.release();
  await dbClient.disconnect();
})();