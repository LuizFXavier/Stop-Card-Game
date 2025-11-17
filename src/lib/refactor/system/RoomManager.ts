import { io, type Socket } from "socket.io-client";
import { gameEventBus } from "../core/GameEventBus";
import {PUBLIC_URL} from '$env/static/public';
import { roomEventBus } from "../core/RoomEventBus";
import type { ServerToClientEvents, ClientToServerEvents } from "../types/socket/SocketEvents";
import type { GameInitDTO, JoinRoomDTO } from "../types/socket/room.dto";
export default class RoomManager{
    
    private roomID:string;
    private socket:Socket<ServerToClientEvents, ClientToServerEvents>;

    private static _instance: RoomManager;

    private lastGameInitData: GameInitDTO | null = null;

    public static getInstance(roomID?: string): RoomManager {
        if (!RoomManager._instance) {
            if (!roomID) {
                throw new Error("RoomManager precisa de um roomID na primeira inicialização.");
            }
            RoomManager._instance = new RoomManager(roomID);
        }
        return RoomManager._instance;
    }

    public getGameData(): GameInitDTO | null {
        return this.lastGameInitData;
    }

    isSaaas:boolean = false;


    private constructor(roomID: string){
        this.roomID = roomID;
        
        this.socket = io(PUBLIC_URL);
        this.subscribeToSocketEvents();
        this.subscribeToRoomEvents();
    }

    public getSocket(){
        return this.socket;
    }
    public getRoomID(){
        return this.roomID;
    }

    private subscribeToSocketEvents(){
        this.socket.on("joinRoom", dto=>{
            console.log("recebido join")
            if(this.isSaaas)
                roomEventBus.emit("server:joinRoom", dto);
            else{
                roomEventBus.emit("server:joinRoom", dto);
            }
        })
        this.socket.on("gameStart", ()=>{
            roomEventBus.emit("server:gameStart");
        })
        this.socket.on("gameInit", dto=>{
            console.log("Recebeu gameINIT")
            this.lastGameInitData = dto;
            console.log("init", dto)
            roomEventBus.emit("server:gameInit", dto)
        })
        this.socket.on("error", dto=>{
            console.log("Houve erro")
            console.log(dto)
        })
    }

    private subscribeToRoomEvents(){
        roomEventBus.on('client:joinRoom', data =>{
            
            this.socket.emit("joinRoom", data);
        })
        roomEventBus.on('client:join', data =>{
            
            this.socket.emit("joinRoom", data);
        })
        roomEventBus.on('client:gameStart',()=>{
            this.socket.emit("gameStart", {roomID:this.roomID})
        })
        roomEventBus.on('client:gameInit',()=>{
            console.log("Enviou INIT")
            this.socket.emit("gameInit", {roomID:this.roomID})
        })
    }
}