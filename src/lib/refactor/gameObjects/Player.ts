import GameObject from "./GameObject";
import { gameEventBus } from "../core/GameEventBus";
import Card from "./Card";
import { Suit, type Rank } from "../types/CardProperties";
import { PlayerState } from "../types/States";
import { Direction } from "../types/PlayerProperties";

export default class Player extends GameObject{
    
    protected id:number;
    protected name:string;

    protected state:PlayerState = PlayerState.IDLE;
    public drawnCard!:Card;

    public hand:Card[] = [];

    private direction:Direction = Direction.UP;

    constructor(id:number, name:string){
        super(0, 0);
        
        this.id = id;
        this.name = name;

        this.resetDrawnCard();
    }
    setPosition(x:number, y:number, direction?:Direction){
        this.x = x;
        this.y = y;
        if(direction != undefined){
            this.direction = direction;
        }
    }
    setHand(cards:{rank:Rank, suit:Suit}[]){
        for(let i = 0; i < cards.length; ++i){
            const card = new Card(cards[i].rank, cards[i].suit)
            card.setValid(false);
            this.hand.push(card);
        }
        this.calculateDrawnPosition();
        this.calculateHandPosition();
    }
    calculateDrawnPosition(){
        const margin = Card.width * 0.2;

        const isVertical = this.isVertical()
        const mainDir = this.direction < 2 ? 1 : 0;

        const cardRotation = isVertical ? (1 -mainDir) * (Math.PI) : (Math.PI * (1 + mainDir *2) / 2);
        const cardVisualWidth = isVertical ? Card.width : Card.height;
        const cardVisualHeight = isVertical ? Card.height : Card.width;
        const cardDir = mainDir ? 1 : -1;

        let drawnX = 0;
        let drawnY = 0;

        if(isVertical){
            if(mainDir){
                drawnX = this.x + (2 * cardVisualWidth + margin);
                drawnY = this.y - (1.5 * cardVisualHeight + 0.5 * margin)
            }
            else{
                drawnX = this.x - (2 * cardVisualWidth + margin) - (cardVisualWidth);
                drawnY = this.y + 0.5 *(cardVisualHeight + margin);
            }
        }
        else{
            if(mainDir){
                drawnX = this.x - (2 * cardVisualWidth + 1.5 * margin);
                drawnY = this.y - (2 * cardVisualHeight + margin)
            }
            else{
                drawnX = this.x + (cardVisualWidth + 1.5 * margin);
                drawnY = this.y + (1 * cardVisualHeight + margin)
            }
        }
        this.drawnCard.width = cardVisualWidth;
        this.drawnCard.height = cardVisualHeight;

        this.drawnCard.setCoords(drawnX, drawnY);
        this.drawnCard.setRotation(cardRotation);

    }
    calculateHandPosition(){
        const margin = Card.width * 0.2;
        const n = this.hand.length;
        const nTop = Math.ceil(n/2);
        const isEven = nTop % 2 == 0;

        const isVertical = this.isVertical()
        const mainDir = this.direction < 2 ? 1 : 0;

        const cardRotation = isVertical ? (1 -mainDir) * (Math.PI) : (Math.PI * (1 + mainDir *2) / 2);
        const cardVisualWidth = isVertical ? Card.width : Card.height;
        const cardVisualHeight = isVertical ? Card.height : Card.width;
        const cardDir = mainDir ? 1 : -1;
        
        // Posicionamento das cartas ao redor do player
        let startX = 0;
        let startY = 0;
        
        if(isVertical){
            
            startY = this.y - cardVisualHeight - margin / 2;
            if(isEven){
                startX = this.x - (margin / 2) - ((nTop / 2) * (cardVisualWidth)) - (margin * (nTop/2 -1));
            }
            else{
                startX = this.x - ((nTop / 2) * (cardVisualWidth)) - (margin * (Math.ceil(nTop/2) -1));
            }
        }
        else{
            startX = this.x - cardVisualWidth - margin / 2;
            if(isEven){
                startY = this.y - (margin / 2) - ((nTop / 2) * (cardVisualHeight)) - (margin * (nTop/2 -1));
            }
            else{
                startY = this.y - ((nTop / 2) * (cardVisualHeight)) - (margin * (Math.ceil(nTop/2) -1));
            }
        }

        this.hand.forEach((card, i)=>{

            let x = 0;
            let y = 0;

            if(isVertical){
                x = startX + Math.floor(i/2) * (cardVisualWidth + margin);
                y = startY + (i % 2 != 0 ? mainDir : 1 - mainDir) * (cardVisualHeight + margin);
            }
            else{
                const transformY = this.y + cardDir * (this.y - startY) - cardVisualHeight * mainDir; 
                x = startX + (i % 2 != 0 ? mainDir : 1 - mainDir) * (cardVisualWidth + margin);
                y = transformY + (-cardDir) * Math.floor(i/2) * (cardVisualHeight + margin);
            }

            card.width = cardVisualWidth;
            card.height = cardVisualHeight;
                
            card.setCoords(x, y);
            card.setRotation(cardRotation);
        })
        
    }

    isVertical():boolean{
        return this.direction % 2 === 0;
    }
    
    buyCard(card:{rank:Rank, suit:Suit}, origin?:("pile" | "discard")){

        this.state = PlayerState.EVAL_PILE;
        console.log("Carta comprada:", card)
        this.drawnCard.set(card.rank, card.suit);
        this.drawnCard.setValid(true);
    }
    discardCard(){

        if(this.hasHability()){
            this.state = PlayerState.HAB_CHOICE;
        }
        else{
            this.state = PlayerState.IDLE;
        }

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
        this.drawnCard.isUp = false;
        this.drawnCard.setValid(false);
    }

    startTurn(){
        this.state = PlayerState.TURN_START;
    }

    endTurn(){
        this.state = PlayerState.IDLE;
    }

    setState(state:PlayerState){
        this.state = state;
    }

    getState():PlayerState{
        return this.state;
    }

    startSpy(){

    }
    endSpy(){
        
    }

    public update(): void{
        
    };
}