import { gameEventBus } from "../core/GameEventBus";
import Card from "./Card";
import GameObject from "./GameObject";

export default class Pile extends GameObject{
    
    public static WIDTH_SPR:number = 149;
    public static HEIGHT_SPR:number = 199;
    
    card:Card;
    
    private clickable:boolean = false;

    constructor(pos:{x:number, y:number}){
        super(pos.x, pos.y)

        this.card = new Card(0, 0);
        this.card.setCoords(pos.x, pos.y);
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