import GameObject from "./GameObject";
import Carta from "./Carta";

export default class Pilha extends GameObject{

    public cartas:Carta[] = [];

    private margem = Carta.LARGURA * 0.05

    private proximaMargem = 0;

    constructor(x:number, y:number){
        super(x, y);
    }

    private adicionarCartas(nCartas:number){
        
        this.proximaMargem = (this.cartas.length) * this.margem;

        while(nCartas > this.cartas.length){
            
            this.cartas.push(new Carta(
                this.x + this.proximaMargem,
                this.y,
                Carta.LARGURA,
                Carta.ALTURA,
                0,
                0,
                false
            ))
            this.proximaMargem += this.margem;
            
        }
    }

    private retirarCartas(nCartas:number){
        while(nCartas < this.cartas.length){
            this.cartas.pop()
        }
    }

    public updateCartas(nCartas:number){

        if(nCartas > this.cartas.length){
            this.adicionarCartas(nCartas)
        }
        else{
            this.retirarCartas(nCartas)
        }
    }

    public static posicionar(x:number, y:number){
        
    }

    public colisao():boolean{

        if(this.cartas.length === 0)
            return false;

        return this.cartas[this.cartas.length - 1].colisao()
    }

    
    public render(): void {
        for(let i = 0; i < this.cartas.length; i++){
            this.cartas[i].render()
        }
    }
}