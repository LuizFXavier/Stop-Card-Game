import Multiplayer from "../../../connection/Multiplayer";
import Game from "../Game";
import Mouse from "../input/Mouse";
import Collision from "../math/Collision";

export default class Botao{
    
    nome:string;
    x:number;
    y:number;
    width:number;
    height:number;
    cor:string;
    visivel:boolean = false;

    constructor(nome:string, cor:string, x:number, y:number, width:number, height:number){
        this.nome = nome;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.cor = cor;
    }

    colisao():boolean{
        if(!this.visivel){
            return false;
        }
        return Collision.rectangleCollision(this, Mouse) && Mouse.clicou
    }

    render(){
        
        if(!this.visivel)
            return;

        Game.ctx.fillStyle = this.cor;

        Game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}