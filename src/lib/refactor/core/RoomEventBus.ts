import EventEmmiter from "eventemitter3"
import { type RoomEventMap } from "../types/RoomEventMap";

const emmiter = new EventEmmiter<RoomEventMap>;

export const roomEventBus = emmiter;