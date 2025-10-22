import GameObject from "./GameObject";
import { gameEventBus } from "../core/GameEventBus";
import Card from "./Card";
import { Suit } from "../types/CardProperties";

export default class Player extends GameObject{
    
    private id:number;

    public hand:Card[] = [];

    constructor(x:number, y:number, id:number){
        super(x, y);
        this.id = id;
        
        this.hand.push(new Card(2, Suit.Clubs))
        this.hand[0].setCoords(x, y)
    }

    public update(): void{
        for(let i = 0; i < this.hand.length; ++i){
            if(this.hand[i].collision()){
                gameEventBus.emit('player:cut', {playerId:this.id, cardIndex:i})
            }
        }
    };
}