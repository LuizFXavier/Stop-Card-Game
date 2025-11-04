import { gameEventBus } from "../core/GameEventBus";
import GameObject from "../gameObjects/GameObject";
import Collision from "../math/Collision";
import Mouse from "../system/Mouse";
import type { GameEventMap } from "../types/GameEventMap";

type ButtonEventName = keyof {
    [K in keyof GameEventMap as GameEventMap[K] extends () => void ? K : never]: GameEventMap[K]
};

export default class Button extends GameObject{
    eventName:ButtonEventName;
    width:number;
    height:number;
    color:string;
    visible:boolean = false;

    constructor(eventName:ButtonEventName, color:string, x:number, y:number, width:number, height:number){
        super(x, y);
        
        this.eventName = eventName;
        this.color = color;

        this.width = width;
        this.height = height;
    }

    update(){
        if(this.collision()){
            gameEventBus.emit(this.eventName)
        }
    }

    collision():boolean{
        if(!this.visible){
            return false;
        }
        return Collision.rectangleCollision(this, Mouse) && Mouse.clicked;
    }
}