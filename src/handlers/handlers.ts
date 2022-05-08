import { Services } from "../types/services";
import { AddCoinsHandler } from "./admin/add_coin.handler";
import { RemoveCoinsHandler } from "./admin/remove_coin.handler";
import { BetPoolHandler } from "./bet/bet_pool.handler";
import { CancelBetHandler } from "./bet/cancel_bet.handler";
import { CancelBettingHandler } from "./bet/cancel_betting.handler";
import { MyBetsHandler } from "./bet/my_bets.handler";
import { PlaceBetHandler } from "./bet/place_bet.handler";
import { ResolveBettingHandler } from "./bet/resolve_betting.handler";
import { StartBettingHandler } from "./bet/start_betting.handler";
import { StopBettingHandler } from "./bet/stop_betting.handler";
import { CoinsHandler } from "./coins/coins.handler";
import { UserCoinsHandler } from "./coins/user_coins.handler";
import { HelpHandler } from "./information/help.handler";
import { PingHandler } from "./ping.handler";
import { BossListHandler } from "./raid/bosses.handler";
import { RaidListHandler } from "./raid/raids.handler";
import { RegisterHandler } from "./user/register.handler";

const handlers = [
    PingHandler,
    HelpHandler,
    RegisterHandler,
    RemoveCoinsHandler,
    AddCoinsHandler,
    CoinsHandler,
    UserCoinsHandler,
    RaidListHandler,
    BossListHandler,
    StartBettingHandler,
    CancelBetHandler,
    CancelBettingHandler,
    ResolveBettingHandler,
    PlaceBetHandler,
    BetPoolHandler,
    StopBettingHandler,
    MyBetsHandler
]

export const createHandlers = (services: Services) => handlers.map(h => new h(services));