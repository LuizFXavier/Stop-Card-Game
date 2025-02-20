import type { naipe } from "../types/naipe";
import Mouse from "../input/Mouse";
import GameObject from "./GameObject";
import Collision from "../math/Collision";
import Imagem from "../spriteSheet/Imagem";
import Game from "../Game";

export default class Carta extends GameObject{

    valor:number;
    naipe:naipe;
    width:number;
    height:number;
    paraCima:boolean = true;
    selecionada:boolean = false;
    modificada:boolean = false;
    sprite:Imagem;
    
    public static LARGURA:number = 71;
    public static ALTURA:number = 101;


    constructor(x:number, y:number, width:number, height:number, valor:number, naipe:naipe, paraCima?:boolean){
        super(x, y)

        this.sprite = new Imagem({x:Carta.LARGURA * (valor-1),
                                        y:Carta.ALTURA * (naipe),
                                        width:Carta.LARGURA,
                                        height:Carta.ALTURA,
                                 },Game.spriteCarta);

        this.width = width;
        this.height = height;

        this.valor = valor;
        this.naipe = naipe;
                                 
        if(paraCima !== undefined){
            this.paraCima = paraCima
        }

    }

    colisao():boolean{
        if (this.valor != -1)
            return Collision.rectangleCollision(this, Mouse) && Mouse.clicou
        
        return false;
    }

    setCarta(valor:number, naipe:number){

        if(this.valor == valor && this.naipe == naipe && !this.modificada)
            return;

        this.valor = valor;
        this.naipe = naipe;
        this.sprite.x = Carta.LARGURA * (valor-1);
        this.sprite.y = Carta.ALTURA * naipe;
    }

    update(): void {
        
    }
    render(): void {
        
        if(this.selecionada){
            this.sprite.x = 923;
            this.sprite.y = Carta.ALTURA;

            this.modificada = true;
        }
        else if(!this.paraCima){
            this.sprite.x = 923;
            this.sprite.y = 0;

            this.modificada = true;
        }
        else if(this.modificada){
            this.setCarta(this.valor, this.naipe)
            console.log("Mostrar carta")
            this.modificada = false;
        }

        if(this.valor != -1){

            this.sprite.drawn(this.x, this.y, this.width, this.height)
        }
    }
}