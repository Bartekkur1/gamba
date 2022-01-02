import { Services } from "../types/services";
import { AddCoinsHandler } from "./admin/add_coin.handler";
import { RemoveCoinsHandler } from "./admin/remove_coin.handler";
import { BetPoolHandler } from "./bet/bet_pool.handler";
import { CancelBetHandler } from "./bet/cancel_bet.handler";
import { PlaceBetHandler } from "./bet/place_bet.handler";
import { ResolveBetHandler } from "./bet/resolve_bet.handler";
import { StartBetHandler } from "./bet/start_bet.handler";
import { CoinsHandler } from "./coins/coins.handler";
import { UserCoinsHandler } from "./coins/user_coins.handler";
import { HelpHandler } from "./information/help.handler";
import { PingHandler } from "./ping.handler";
import { BossListHandler } from "./raid/bosses.handler";
import { RaidListHandler } from "./raid/raids.handler";

const handlers = [
    PingHandler,
    HelpHandler,
    RemoveCoinsHandler,
    AddCoinsHandler,
    CoinsHandler,
    UserCoinsHandler,
    RaidListHandler,
    BossListHandler,
    StartBetHandler,
    CancelBetHandler,
    ResolveBetHandler,
    PlaceBetHandler,
    BetPoolHandler
]

export const createHandlers = (services: Services) => handlers.map(h => new h(services));