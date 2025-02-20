import Game from "$lib/Game/Game";
import type Carta from "$lib/Game/GameObject/Carta";
import type Player from "$lib/Game/GameObject/Player";
import type Habilidade from "$lib/Game/habilidade/Habilidade";

import {io, Socket} from "socket.io-client"

export default class Multiplayer{
    public static socket:Socket | null = null;

    public static init(porta:string){
        if(Multiplayer.socket === null){
            Multiplayer.socket = io(porta)
        }
    }

    public static startGameEvents(){
        if(this.socket === null){
            return;
        }

        this.socket.on("updateGame", (players:Player[], 
                                      descarte:Carta[], 
                                      pilhaCorte:Carta[], 
                                      nCartasPilha:number, 
                                      vez:number,
                                      habilidade:Habilidade)=>{
            
            
            Game.updatePlayers(players, habilidade);
            Game.updatePilhas(descarte, pilhaCorte, nCartasPilha)

            console.log(Game.descarte)
            console.log(Game.pilha)

            Game.updateVez(vez);
        })

    }

    public static enviarEvento(evento:string, objeto:any, hab?:any){
        Multiplayer.socket?.emit(evento, objeto, hab)
    }
}