import { gameEventBus } from "../core/GameEventBus";
import Card from "./Card";
import GameObject from "./GameObject";

export default class Pile extends GameObject{
    
    card:Card;
    
    private clickable:boolean = false;

    constructor(x:number, y:number){
        super(x, y)

        this.card = new Card(0, 0);
        this.card.setCoords(0, 0);
    }

    setClickable(b:boolean){
        this.clickable = b;
    }

    update(){
        if(this.collision()){
            this.clickable = false;
            gameEventBus.emit("pile:buyStack");
        }
    }

    collision():boolean{

        return this.clickable && this.card.collision()
    }
}