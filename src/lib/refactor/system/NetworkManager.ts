import { gameEventBus } from "../core/GameEventBus";

export default class NetworkManager{
    
    mainPlayerId:number;

    constructor(mainPlayerId:number){
        this.mainPlayerId = mainPlayerId;
        
        this.subscribeToGameEvents();
    }

    private subscribeToGameEvents(){
        gameEventBus.on('player:cut', (data)=>{
            console.log("O player " + data.playerId + " clicou em " + data.cardIndex)
        })
    }
}