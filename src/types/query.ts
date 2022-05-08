export interface CountQueryResult {
    count: string;
}

export interface GetUserCoinsQueryResult {
    coins: number;
}

export interface GetUserQueryResult {
    username: string;
    userid: string;
    coins: number;
}