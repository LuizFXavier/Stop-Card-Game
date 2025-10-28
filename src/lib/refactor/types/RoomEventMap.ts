import type { Rank, Suit } from "./CardProperties";
import type { InitData, JoinData } from "./InitData";

export type RoomEventMap = {
    'client:joinRoom': (data:{roomID:string, userID:string}) => void;
    'client:gameStart': () => void;
    'client:gameInit': () => void;

    'server:joinRoom': (data:JoinData) => void;
    'server:gameStart': () => void;
    'server:gameInit': (data:InitData) => void;
}