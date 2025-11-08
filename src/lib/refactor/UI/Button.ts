import { gameEventBus } from "../core/GameEventBus";
import GameObject from "../gameObjects/GameObject";
import Collision from "../math/Collision";
import Mouse from "../system/Mouse";
import type { GameEventMap } from "../types/GameEventMap";

type ButtonEventName = keyof {
    [K in keyof GameEventMap as GameEventMap[K] extends () => void ? K : never]: GameEventMap[K]
};

export default class Button extends GameObject{
    private _eventName:ButtonEventName;
    private _width:number;
    private _height:number;
    private _color:string;
    private _visible:boolean = false;

    constructor(eventName:ButtonEventName, color:string, x:number, y:number, width:number, height:number){
        super(x, y);
        
        this._eventName = eventName;
        this._color = color;

        this._width = width;
        this._height = height;
    }

    update(){
        if(this.collision()){
            gameEventBus.emit(this._eventName);
        }
    }

    show():void{this._visible = true;}
    hide():void{this._visible = false;}

    public get visible():boolean{
        return this._visible;
    }

    public get color():string{
        return this._color;
    }

    public get width():number{
        return this._width;
    }
    public get height():number{
        return this._height;
    }

    collision():boolean{
        if(!this._visible){
            return false;
        }
        return Collision.rectangleCollision(this, Mouse) && Mouse.clicked;
    }
}