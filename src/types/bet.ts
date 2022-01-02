export interface UserBet {
    userId: string;
    item: string;
    coins: number;
};

export enum BetStatus {
    PENDING = "PENDING",
    STOPPED = "STOPPED",
    CLOSED = "CLOSED",
    RESOLVED = "RESOLVED"
};

export interface Bet {
    id: string;
    status: BetStatus;
    start?: number;
    end?: number;
    raid: string;
    boss: string;
    difficulty: string;
    bets: UserBet[];
};