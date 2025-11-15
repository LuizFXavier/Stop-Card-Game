import { gameEventBus } from "../core/GameEventBus";
import { roomEventBus } from "../core/RoomEventBus";
import { Suit, type Rank } from "../types/CardProperties";
import type { JoinData } from "../types/InitData";
export default class DummyServer{
    
    public static started:boolean = false;

    public static players = [{name:"Baixo", id:0}, 
        {name:"Direita", id:1}, 
        {name:"Cima", id:2}, {name:"Esquerda", id:3}]

    public static start(){
        if(!this.started){
            this.subscribeToRoomEvents();
            this.subscribeToGameEvents();
            this.started = true; 
        }
    }

    public static subscribeToRoomEvents(){
        roomEventBus.on('client:joinRoom', data =>{
            console.log("O player " + data.userID + " entrou na sala " + data.roomID)

            let joinData:JoinData = {host:0, rules:{a:false}, players:this.players, identifier:0}
            roomEventBus.emit("server:joinRoom", joinData)
        })
        roomEventBus.on("client:gameStart", () =>{
            roomEventBus.emit("server:gameStart");
        })
        roomEventBus.on("client:gameInit", ()=>{
            const cards = this.createPlayers(this.players.length, 6)
            let playersCards = [];
            for(let i = 0; i < this.players.length; ++i){
                playersCards.push({id:this.players[i].id, cards:cards[i]})
            }
            console.log("Init")
            roomEventBus.emit("server:gameInit", {playersCards:playersCards, turnId:0})
        })
    }

    public static subscribeToGameEvents(){
        gameEventBus.on("game:buyStack", ()=>{
            console.log("Player comprou da pilha")
            
            gameEventBus.emit("network:buyStack", {playerId:0, card:{rank:5, suit:1}});
        })
        gameEventBus.on("game:buyDiscard", ()=>{
            console.log("Player comprou do descarte")
            
            gameEventBus.emit("network:buyDiscard", {playerId:0, card:{rank:9, suit:3}});
        })
        gameEventBus.on("player:discard", ()=>{
            console.log("Player descartou")

            gameEventBus.emit("network:discard", {playerId:0})
        })
    }
    

    private static createPlayers(nP:number, nC:number){
        type card = {rank:Rank, suit:Suit}
        let players:card[][] = []
        for(let i = 0; i < nP; ++i){
            let cards:card[] = []
            for(let j = 0; j < nC; ++j){
                //@ts-ignore
                cards.push({rank:j, suit:i});
                console.log("lopando")
            }
            players.push(cards);
        }
        return players;
    }
}