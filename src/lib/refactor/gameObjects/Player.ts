import GameObject from "./GameObject";
import { gameEventBus } from "../core/GameEventBus";
import Card from "./Card";
import { Suit, type Rank } from "../types/CardProperties";

export default class Player extends GameObject{
    
    private id:number;

    public drawnCard!:Card;

    public hand:Card[] = [];

    constructor(x:number, y:number, id:number, cards:{rank:Rank, suit:Suit}[]){
        super(x, y);
        
        this.id = id;
        for(let i = 0; i < cards.length; ++i){
            this.hand.push(new Card(cards[i].rank, cards[i].suit));
            this.hand[i].setCoords(x + i * (Card.width + 10), y);
        }

        this.resetDrawnCard();
    }
    
    buyCard(card:{rank:Rank, suit:Suit}){
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

    public update(): void{
        for(let i = 0; i < this.hand.length; ++i){
            if(this.hand[i].collision()){
                gameEventBus.emit('player:cut', {playerId:this.id, cardIndex:i});
            }
        }
    };
}