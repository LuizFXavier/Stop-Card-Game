import Collision from "../math/Collision";
import Mouse from "../system/Mouse";
import type { Suit, Rank } from "../types/CardProperties";
import GameObject from "./GameObject";

export default class Card extends GameObject{

    public static WIDTH_SPR:number = 71;
    public static HEIGHT_SPR:number = 101;

    public rank:Rank;
    public suit:Suit;
    public isUp:boolean = false;

    public width = Card.WIDTH_SPR;
    public height = Card.HEIGHT_SPR;

    public srcCoord:{x:number, y:number};

    constructor(rank:Rank, suit:Suit){
        super(0,0);
        this.rank = rank;
        this.suit = suit;

        this.srcCoord = {x:Card.WIDTH_SPR * rank, y:Card.HEIGHT_SPR * suit}
    }

    public set(rank:Rank, suit:Suit){
        this.rank = rank;
        this.suit = suit;

        this.srcCoord = {x:Card.WIDTH_SPR * rank, y:Card.HEIGHT_SPR * suit}
    }

    public setCoords(x:number, y:number){
        this.x = x;
        this.y = y;
    }
    
    public collision():boolean{
        return Collision.rectangleCollision(this, Mouse) && Mouse.clicked;
    }

}