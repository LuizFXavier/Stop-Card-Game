import { type Rank, type Suit } from "./CardProperties"

export type JoinData = {
    host:number,
    rules:{a:boolean},
    players:{name:string, id:number}[],
    identifier:number
}

export type InitData = {
    cards:{rank:Rank, suit:Suit}[][],
                            turnId:number
}