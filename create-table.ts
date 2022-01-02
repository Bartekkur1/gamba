import { DatabaseClient } from "./src/services/db.client";

const userTable = `
CREATE TABLE IF NOT EXISTS users (
    userId varchar(20) NOT NULL,
    coins integer NOT NULL DEFAULT '0',
    PRIMARY KEY (userId)
  )
`;


(async () => {
  const dbClient = new DatabaseClient();
  await dbClient.connect();

  await dbClient.execute(userTable);

  await dbClient.disconnect();
})();