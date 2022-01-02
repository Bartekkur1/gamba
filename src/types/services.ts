import { UserDao } from "../dao/user.dao";
import { BetManager } from "../services/bet.manager";

export interface Services {
    user: UserDao;
    betManager: BetManager;
}