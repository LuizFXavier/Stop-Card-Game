import type { Rank, Suit } from "./CardProperties";
import type { InitData, JoinData } from "./InitData";
import type { GameInitDTO, JoinConfigDTO } from "./socket/room.dto";

export type RoomEventMap = {
    'client:joinRoom': (data:{roomID:string, userID:string}) => void;
    'client:join': (data:{roomID:string, userID:string}) => void;
    'client:gameStart': () => void;
    'client:gameInit': () => void;

    'server:joinRoom': (data:JoinConfigDTO) => void;
    'server:join': (data:JoinConfigDTO) => void;
    'server:gameStart': () => void;
    'server:gameInit': (data:GameInitDTO) => void;
}