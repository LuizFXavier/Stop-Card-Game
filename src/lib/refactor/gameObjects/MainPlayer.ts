import { gameEventBus } from "../core/GameEventBus";
import type { Rank, Suit } from "../types/CardProperties";
import { PlayerState } from "../types/States";
import Card from "./Card";
import Player from "./Player"

export default class MainPlayer extends Player{

    
    public update(): void {
        for(let i = 0; i < this.hand.length; ++i){
            if(this.hand[i].collision()){
                gameEventBus.emit('player:cut', {playerId:this.id, cardIndex:i});
            }
        }
    }

    buyCard(card:{rank:Rank, suit:Suit}, origin:("pile" | "discard")){

        if(origin == "discard"){
            this.change_state(PlayerState.EVAL_DISCARD);
        }
        else{
            this.change_state(PlayerState.EVAL_PILE);
        }
        console.log("Carta comprada:", card)
        this.drawnCard.set(card.rank, card.suit);
        this.drawnCard.setValid(true);
    }
    
    discardCard(){
        const card = this.drawnCard;
        this.resetDrawnCard();
        return card;
    }

    resetDrawnCard(){
        this.drawnCard = new Card(0,0);
        this.drawnCard.isUp = true;
        this.drawnCard.setValid(false);
    }
}