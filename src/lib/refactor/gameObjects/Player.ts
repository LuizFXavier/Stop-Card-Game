import GameObject from "./GameObject";
import { gameEventBus } from "../core/GameEventBus";
import Card from "./Card";
import { Suit, type Rank } from "../types/CardProperties";
import { PlayerState } from "../types/States";

export default class Player extends GameObject{
    
    protected id:number;
    protected name:string;

    protected state:PlayerState = PlayerState.IDLE;
    public drawnCard!:Card;

    public hand:Card[] = [];

    public isVertical:boolean = true;

    constructor(id:number, name:string){
        super(0, 0);
        
        this.id = id;
        this.name = name;

        this.resetDrawnCard();
    }
    setPosition(x:number, y:number, isVertical?:boolean){
        this.x = x;
        this.y = y;
        if(isVertical != undefined){
            this.isVertical = isVertical;
        }
    }
    setHand(cards:{rank:Rank, suit:Suit}[]){
        for(let i = 0; i < cards.length; ++i){
            this.hand.push(new Card(cards[i].rank, cards[i].suit));
        }
        this.calculateHandPosition();
    }

    calculateHandPosition(){
        const margin = Card.width * 0.2;
        const n = this.hand.length;
        const nTop = Math.ceil(n/2);
        const isEven = nTop % 2 == 0;

        const cardRotation = this.isVertical ? 0 : (Math.PI / 2); // 90 graus
        const cardVisualWidth = this.isVertical ? Card.width : Card.height;
        const cardVisualHeight = this.isVertical ? Card.height : Card.width;

        let startX = 0;
        let startY = 0;
        
        startY = this.y - cardVisualHeight - margin / 2;
        if(isEven){
            startX = this.x - (margin / 2) - ((nTop / 2) * (cardVisualWidth)) - (margin * (nTop/2 -1));
        }
        else{
            startX = this.x - ((nTop / 2) * (cardVisualWidth)) - (margin * (Math.ceil(nTop/2) -1)); 
        }
        
        this.hand.forEach((card, i)=>{
            const x = startX + Math.floor(i/2) * (cardVisualWidth + margin);
            const y = startY + (i % 2 != 0 ? 0 : 1) * (cardVisualHeight + margin);

            card.width = cardVisualWidth;
            card.height = cardVisualHeight;
                
            card.setCoords(x, y);
            card.setRotation(cardRotation)
        })
        
    }
    
    buyCard(card:{rank:Rank, suit:Suit}, origin?:("pile" | "discard")){
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
        this.drawnCard.isUp = false;
        this.drawnCard.setValid(false);
    }

    change_state(state:PlayerState){
        this.state = state;
    }

    public getState():PlayerState{
        return this.state;
    }

    public update(): void{
        
    };
}