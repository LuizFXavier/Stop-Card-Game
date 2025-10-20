import EventEmmiter from "eventemitter3"
import { type GameEventMap } from "../types/GameEventMap"

const emmiter = new EventEmmiter<GameEventMap>;

export const gameEventBus = emmiter;