import Collision from "../math/Collision";
import Mouse from "../system/Mouse";
import type { Suit, Rank } from "../types/CardProperties";
import GameObject from "./GameObject";

export default class Card extends GameObject{

    public static WIDTH_SPR:number = 616;
    public static HEIGHT_SPR:number = 823;

    public static faceDownCoord = {x:this.WIDTH_SPR * 13, y:0};

    public rank:Rank;
    public suit:Suit;
    public isUp:boolean = true;
    public valid:boolean = true;
    public rotation:number = 0;
    public width:number;
    public height:number;

    public static width = 0;
    public static height = 0;

    public static setGlobalDimesions(width:number){
        Card.width = width * 0.065;
        Card.height = this.width * this.HEIGHT_SPR / this.WIDTH_SPR;;
    }

    public srcCoord:{x:number, y:number};

    constructor(rank:Rank, suit:Suit){
        super(0,0);
        this.rank = rank;
        this.suit = suit;
        this.width = Card.width;
        this.height = Card.height;

        this.srcCoord = {x:Card.WIDTH_SPR * rank, y:Card.HEIGHT_SPR * suit}
    }

    public set(rank:Rank, suit:Suit){
        this.rank = rank;
        this.suit = suit;

        this.srcCoord = {x:Card.WIDTH_SPR * rank, y:Card.HEIGHT_SPR * suit}
    }
    public setValid(b:boolean){
        this.valid = b;
    }

    public setCoords(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    public setRotation(r:number){
        this.rotation = r;
    }
    
    public collision():boolean{
        return Collision.rectangleCollision(this,
             Mouse) 
             && Mouse.clicked;
    }

}