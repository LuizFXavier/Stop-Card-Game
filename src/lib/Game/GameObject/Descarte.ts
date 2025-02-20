import GameObject from "./GameObject";
import Carta from "./Carta";

export default class Descarte extends GameObject{

    private cartas:Carta[] = [];

    constructor(x:number, y:number){
        super(x, y);
        this.resetDescarte()
    }

    private resetDescarte(){
        this.cartas = []

        this.cartas.push(new Carta( this.x,
                                    this.y,
                                    Carta.LARGURA,
                                    Carta.ALTURA,
                                    -1,
                                    0))
    }

    public updateCartas(cartas:Carta[]){

        console.log(cartas)
        // Coloca mais carta caso o array recebido seja maior que o atual
        for(let i = this.cartas.length; i < cartas.length; i++){
            this.cartas.push(new Carta( this.x,
                                        this.y,
                                        Carta.LARGURA,
                                        Carta.ALTURA,
                                        cartas[i].valor,
                                        cartas[i].naipe,
                                        true))
        }
        
        let diferenca = this.cartas.length - cartas.length;
        
        if(diferenca === 1){
            this.cartas.pop()
        }
        else if(diferenca > 1){
            let ultimaCarta = this.cartas.pop()!

            this.resetDescarte()

            this.cartas.push(ultimaCarta)
        }
        console.log("Descarte", this.cartas)
    }

    public colisao():boolean{
        if(this.cartas.length === 0)
            return false

        return this.cartas[this.cartas.length -1].colisao()
    }

    public render(): void {
        for(let i = 0; i < this.cartas.length; i++){
            this.cartas[i].render()
        }
    }
}