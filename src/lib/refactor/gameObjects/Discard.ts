import { gameEventBus } from "../core/GameEventBus";
import Card from "./Card";
import GameObject from "./GameObject";


export default class Discard extends GameObject{

    cards:Card[] = [];
        
    private clickable:boolean = false;

    constructor(x:number, y:number){
        super(x, y)

        const card = new Card(0, 0);
        card.setCoords(0, 0);
        this.cards.push(card);
    }

    update(){
        this.collision();
    }

    setClickable(b:boolean){
        this.clickable = b;
    }

    getTop(): (Card | null){
        if(this.cards.length > 0){
            return this.cards[this.cards.length -1]
        }
        return null;
    }

    collision(){
        const card = this.getTop();

        if(!card)
            return false;

        if(this.clickable && card.collision()){
            this.clickable = false;
            gameEventBus.emit("discard:buyDiscard");
        }
    }

}