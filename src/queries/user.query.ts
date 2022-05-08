export default {
    createUserQuery: (id: string, username: string) => `INSERT INTO users (userId, userName) VALUES ('${id}', '${username}');`,
    selectUserQuery: (id: string) => `SELECT COUNT(*) FROM users WHERE userId = '${id}';`,
    getUserCoins: (id: string) => `SELECT coins FROM users WHERE userId = '${id}';`,
    incrementUserCoins: (id: string, amount: number) => `UPDATE users SET coins = coins + ${amount} WHERE userId = '${id}';`,
    decrementUserCoins: (id: string, amount: number) => `UPDATE users SET coins = coins - ${amount} WHERE userId = '${id}';`,
    getAllUsers: () => 'SELECT * FROM users'
}