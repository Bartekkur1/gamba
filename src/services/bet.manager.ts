import { Bet, BetStatus, UserBet } from "../types/bet";
import drop from '../../drop.json';

export class BetManager {

    private bets: Bet[];
    private pool: number;

    constructor() {
        this.bets = [];
        this.pool = 0;
    }

    getPool() {
        return this.pool;
    }

    resetPool() {
        this.pool = 0;
    }

    getLastBet(): Bet {
        if (this.bets.length > 0) {
            return this.bets[this.bets.length - 1];
        } else {
            throw new Error('There are no bets yet!');
        }
    }

    startBet(bet: Bet) {
        if (this.bets.length > 0) {
            const lastBet = this.getLastBet();
            if (lastBet.status === BetStatus.PENDING) {
                throw new Error('Previous bet is still pending!');
            }
        }

        bet.start = new Date().getTime();
        bet.status = BetStatus.PENDING;
        this.bets.push(bet);
    }

    stopBet() {
        const lastBet = this.getLastBet();

        if (lastBet.status != BetStatus.PENDING) {
            throw new Error('Bet is already stoped!');
        }

        lastBet.status = BetStatus.STOPPED;
        return lastBet;
    }

    cancelBet() {
        if (this.bets.length > 0) {
            const lastBet = this.getLastBet();
            if (lastBet.status !== BetStatus.PENDING) {
                throw new Error('Previous bet is already canceled!');
            }
        }

        const lastBet = this.getLastBet();
        lastBet.status = BetStatus.CLOSED;
        lastBet.end = new Date().getTime();
        for (let bet of lastBet.bets) {
            this.pool -= bet.coins;
        }
        return lastBet;
    }

    getUserBets(userId: string) {
        const lastBet = this.getLastBet();
        if (lastBet.status !== BetStatus.PENDING) {
            throw new Error('There is no pending bet!');
        }

        return lastBet.bets.filter(b => b.userId === userId);
    }

    cancelUserBets(userId: string) {
        const lastBet = this.getLastBet();
        const userBets = this.getUserBets(userId);
        if (userBets.length === 0) {
            throw new Error(`<@${userId}> dont have any ongoing bets!`);
        }

        lastBet.bets = lastBet.bets.filter(b => b.userId !== userId);

        for (let bet of userBets) {
            this.pool -= bet.coins;
        }

        return userBets;
    }

    resolveBet() {
        const lastBet = this.getLastBet();
        lastBet.status = BetStatus.RESOLVED;
        lastBet.end = new Date().getTime();

        return lastBet;
    }

    placeBet(userBet: UserBet) {
        const lastBet = this.getLastBet();
        if (lastBet.status === BetStatus.PENDING) {

            const bossItems = drop[lastBet.raid][lastBet.boss][lastBet.difficulty];
            if (!userBet.item || !bossItems.includes(userBet.item)) {
                throw new Error("Boss doesn't drop that item!");
            }

            lastBet.bets.push(userBet);
            this.pool += userBet.coins;
        } else {
            throw new Error(`Can't bet on ${lastBet.status} bets!`);
        }
    }
}