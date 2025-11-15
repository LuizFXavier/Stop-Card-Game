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
            this.state = PlayerState.EVAL_DISCARD;
        }
        else{
            this.state = PlayerState.EVAL_PILE;
        }
        gameEventBus.emit("mainPlayer:stateChange");

        console.log("Carta comprada:", card)
        this.drawnCard.set(card.rank, card.suit);
        this.drawnCard.setValid(true);
    }

    startTurn(){
        this.state = PlayerState.TURN_START;
        gameEventBus.emit("mainPlayer:stateChange");
    }

    endTurn(){
        this.state = PlayerState.IDLE;
        gameEventBus.emit("mainPlayer:stateChange");
    }
    
    discardCard(){
        if(this.hasHability()){
            this.state = PlayerState.HAB_CHOICE;
        }
        else{
            this.state = PlayerState.IDLE;
        }
        gameEventBus.emit("mainPlayer:stateChange");

        const card = this.drawnCard;
        this.resetDrawnCard();
        return card;
    }


    hasHability():boolean{
        return false;
    }

    resetDrawnCard(){
        let x = 0, y = 0;
        if(this.drawnCard != undefined){
            x = this.drawnCard.x;
            y = this.drawnCard.y;
        }
        this.drawnCard = new Card(10,this.id);
        this.drawnCard.setCoords(x, y);
        this.drawnCard.isUp = true;
        this.drawnCard.setValid(false);
    }

    startSpy(): void {
        const start = this.hand.length == 1 ? 0 : 1
        for(let i = start; i < this.hand.length; i = i + 2){
            this.hand[i].flip();
        }
    }
    endSpy(): void {
        const start = this.hand.length == 1 ? 0 : 1
        for(let i = start; i < this.hand.length; i = i + 2){
            this.hand[i].flip();
        }
    }
}