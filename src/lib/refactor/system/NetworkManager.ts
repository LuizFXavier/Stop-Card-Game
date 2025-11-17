import { io, type Socket } from "socket.io-client";
import { gameEventBus } from "../core/GameEventBus";
import {PUBLIC_URL} from '$env/static/public';
import { roomEventBus } from "../core/RoomEventBus";
import type { ServerToClientEvents, ClientToServerEvents } from "../types/socket/SocketEvents";
import type { JoinRoomDTO } from "../types/socket/room.dto";
import RoomManager from "./RoomManager";
export default class NetworkManager{
    
    mainPlayerId:number;
    roomId:string;
    private socket:Socket<ServerToClientEvents, ClientToServerEvents>;

    constructor(roomManager:RoomManager, mainPlayerId:number){
        
        this.mainPlayerId = mainPlayerId;
        
        this.roomId = roomManager.getRoomID();
        this.socket = roomManager.getSocket();
        
        this.subscribeToSocketEvents();
        this.subscribeToGameEvents();
    }

    private subscribeToSocketEvents(){
        this.socket.on("dealFinish", ()=>{
            console.log("socket deal")
            gameEventBus.emit("network:dealFinish")
        })
        this.socket.on("spyFinish", ()=>{
            console.log("socket spy")
            gameEventBus.emit("network:spyFinish")
        })

        this.socket.on("buyStack", dto=>{
            console.log("socket buy Stack", dto)
            gameEventBus.emit("network:buyStack", {playerId:dto.identifier, card:dto.card});
        })

        this.socket.on("buyDiscard", dto=>{
            console.log("socket buy discard", dto)
            gameEventBus.emit("network:buyDiscard", {playerId:dto.identifier, card:dto.card});
        })

        this.socket.on("exchangeCard", dto=>{
            gameEventBus.emit("network:exchangeCard", dto);
        })
        this.socket.on("discard", ()=>{
            gameEventBus.emit("network:discard");
        })
        this.socket.on("passTurn", dto=>{
            gameEventBus.emit("network:passTurn", dto);
        })

        this.socket.on("successCut", (dto)=>{
            console.log("success cut")
            gameEventBus.emit("network:successCut", dto);
        })
        this.socket.on("wrongCut", (dto)=>{
            console.log("wrong cut")
            gameEventBus.emit("network:wrongCut", dto);
        })
        this.socket.on("gameEnd", (dto)=>{
            console.log("socket game End")
            gameEventBus.emit("network:gameEnd", dto);
        })
        this.socket.on("wrongStop", (dto)=>{
            console.log("socket rong stop")
            // gameEventBus.emit("network:gameEnd", dto);
        })
    }

    private subscribeToGameEvents(){

        gameEventBus.on("game:dealFinish", ()=>{
            console.log("game deal")
            this.socket.emit("dealFinish", {roomID:this.roomId})
        })

        gameEventBus.on("game:spyFinish", ()=>{
            console.log("game spy")
            this.socket.emit("spyFinish", {roomID:this.roomId})
        })

        gameEventBus.on("game:buyStack", ()=>{
            console.log("Player comprou da pilha")

            this.socket.emit("buyStack", {playerID:this.mainPlayerId})
        })
        
        gameEventBus.on("game:buyDiscard", ()=>{
            console.log("Player comprou do descarte")

            this.socket.emit("buyDiscard", {playerID:this.mainPlayerId})
        })

        gameEventBus.on("game:exchangeCard", cardIndex=>{
            this.socket.emit("exchangeCard", {playerID:this.mainPlayerId, indexCard:cardIndex})
        })

        gameEventBus.on("player:discard", ()=>{
            console.log("Player descartou")

            this.socket.emit("discard", {playerID:this.mainPlayerId})
        })
        gameEventBus.on("game:endTurn", ()=>{
            this.socket.emit("endTurn", {roomID:this.roomId})
        })
        gameEventBus.on("game:cut", cardIndex=>{
            console.log("game cut")
            this.socket.emit("cut", {playerID:this.mainPlayerId, indexCard:cardIndex})
        })
        gameEventBus.on("game:stopRequest", ()=>{
            console.log("game stop")
            this.socket.emit("stopRequest", {playerID:this.mainPlayerId, valid:true})
        })
    }
}