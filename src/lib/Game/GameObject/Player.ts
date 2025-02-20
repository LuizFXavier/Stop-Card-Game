import Carta from "./Carta";
import GameObject from "./GameObject";
import Game from "../Game";
import Multiplayer from "../../../connection/Multiplayer";
import { origemCompra } from "../types/origemCompra";
import Habilidade from "../habilidade/Habilidade";
import { estadoHab } from "../types/estadoHab";
import Habilidade9 from "../habilidade/Habilidade9";
import Habilidade10 from "../habilidade/Habilidade10";
import HabilidadeQ from "../habilidade/HabilidadeQ";
import HabilidadeJ from "../habilidade/HabilidadeJ";
import Habilidade8 from "../habilidade/Habilidade8";
import Habilidade7 from "../habilidade/Habilidade7";

export default class Player extends GameObject{
    
    private mao:Carta[] = []
    
    private comprada:Carta;

    public pontos:number = 0;
    
    private habilidade: null | Habilidade = null;
    
    public nome:string;
    
    private id:number;

    public comprou:origemCompra = origemCompra.nula;

    constructor(x:number, y:number, nome:string, id:number){
        super(x, y)
        this.nome = nome

        this.id = id;

        let isMainPlayer = this.id === Game.selfPlayer

        let m = isMainPlayer ? 1:3/4

        this.comprada = new Carta(x, y, Carta.LARGURA *m, Carta.ALTURA *m, -1, 0, isMainPlayer)
    }

    posicionarPlayer(x:number, y:number){
        this.x = x;
        this.y = y;

        this.comprada.x = this.x * 0.5
        this.comprada.y = this.y
    }

    //Posicionamento das cartas ao redor do centro da posição do player
    posicionarCartas(){
        let margemX = 10;
        let valorMargem = 5;
        let m = this.id === Game.selfPlayer ? 1:3/4;
        
        let margemY = 5 * m;

        for(let i = 0; i < this.mao.length; i++){

            let calcX = Math.floor(i/2) - Math.floor(Math.ceil(this.mao.length/2)/2);

            if(calcX < 0){
                margemX = -valorMargem * Math.abs(Math.floor(i/2) - Math.ceil(this.mao.length/2)/2)
            }
            else if(calcX > 0){
                margemX = valorMargem * (Math.abs(Math.floor(i/2) - Math.ceil(this.mao.length/2)/2) +1)
            }
            else{
                if((Math.ceil(this.mao.length/2)) % 2 != 0)
                    margemX = 0
                else
                    margemX = valorMargem
            }

            this.mao[i].x = this.x + (Carta.LARGURA * (Math.floor(i/2) - Math.ceil(this.mao.length/2)*2/4) + margemX) * m

            this.mao[i].y = this.y + (Carta.ALTURA *m + margemY) * (i%2 -1) + (margemY * (i%2))
        }
    }

    setCartas(player:Player){
        console.log("Player novo:", player)
        
        let m = this.id === Game.selfPlayer ? 1:3/4

        for(let i = 0; i < player.mao.length; i++){
            if(i < this.mao.length){
                console.log("Atualização da mão")
                this.mao[i].setCarta(player.mao[i].valor, player.mao[i].naipe)
            }
            else{
                this.mao.push(new Carta(0, 0, Carta.LARGURA *m, Carta.ALTURA *m, player.mao[i].valor, player.mao[i].naipe))
            }
        }
        while(this.mao.length != player.mao.length){
            this.mao.pop()
        }

        this.comprada.setCarta(player.comprada.valor, player.comprada.naipe)
    
        this.posicionarCartas();

        // console.log("Esse player", this)
    }

    getValorComprada(){
        return this.comprada.valor;
    }

    setHabilidade(habilidade:Habilidade){

        if(this.habilidade && this.habilidade.id === habilidade.id){
            this.habilidade.updateState(habilidade.estado)
            return;
        }

        switch (habilidade.id) {
            case 7:
                this.habilidade = new Habilidade7(habilidade.id, this.id)
                break;
            case 8:
                this.habilidade = new Habilidade8(habilidade.id, this.id)        
                break;
            case 9:
                this.habilidade = new Habilidade9(habilidade.id, this.id)        
                break;
            case 10:
                this.habilidade = new Habilidade10(habilidade.id, this.id)        
                break;
            case 11:
                this.habilidade = new HabilidadeQ(habilidade.id, this.id)
                break;
            case 12:
                this.habilidade = new HabilidadeJ(habilidade.id, this.id)
                break;
        }
        
    }

    iniciarHabilidade(){
        this.habilidade?.iniciarUso()
    }

    aplicarHabilidade(){
        this.habilidade?.aplicarEfeito()
    }

    encerrarHabilidade(){
        this.habilidade = null;
    }
    virarCarta(index:number, virada:boolean){
        this.mao[index].paraCima = virada;
        
    }
    colisao(){
        for(let i = 0; i < this.mao.length; i++){
            if(this.mao[i].colisao()){
                return i
            }
        }
        return -1;
    }

    comprar(){

        if(this.comprarPilha()){
            Game.setButtonView(["descartar"], true)
        }
        else
            this.comprarDescarte();
    }

    comprarDescarte(){
        if(this.comprou !== origemCompra.nula)
            return false;
        
        if(Game.descarte.colisao()){
            this.comprou = origemCompra.descarte;
            Multiplayer.socket?.emit("comprarDescarte", Game.salaID, Game.selfPlayer)
            
            return true; 
        }
        return false;
    }

    comprarPilha(){
        if(this.comprou !== origemCompra.nula)
            return false;

        if(Game.pilha.colisao()){
            this.comprou = origemCompra.pilha;
            Multiplayer.socket?.emit("comprarPilha", Game.salaID, Game.selfPlayer)

            return true;
        }
        return false;
    }

    cortar(){
        if(this.comprou){
            return;
        }
        
        const index = this.colisao()

        if(index != -1){
            Multiplayer.socket?.emit("cortar", Game.salaID, Game.selfPlayer, index)
        }
    }

    trocarCarta(){

        if(!this.comprou){
            return;
        }
        
        const index = this.colisao()
        if(index != -1){

            this.comprou = origemCompra.nula;
            Multiplayer.socket?.emit("trocarCarta", Game.salaID, Game.selfPlayer, index)
            Game.setButtonView(["descartar"], false)
        }
        
    }

    descartar(){
        // console.log("Descartar")
        if(this.comprou === origemCompra.nula)
            return

        const botaoDescarte = Game.botoes.get("descartar")!

        if(botaoDescarte.colisao()){
            Multiplayer.socket?.emit("descartar", Game.salaID, Game.selfPlayer)
            
            this.comprou = origemCompra.nula;

            Game.setButtonView(["descartar"], false)
        }
    }

    pedirStop(){
        const botaoStop = Game.botoes.get("stop")!

        if(botaoStop.colisao()){
            Multiplayer.enviarEvento("stop", {salaID:Game.salaID, playerID:Game.selfPlayer})

            Game.setButtonView(["stop"], false)
        }
    }

    marcarCarta(index:number, selecionada:boolean){
        if(index < 0)
            return;

        this.mao[index].selecionada = selecionada;
    }

    desvirarTodas(){
        for(let i = 0; i < this.mao.length; i++){
            this.mao[i].paraCima = true;
        }
    }
    
    update(): void {

        if(this.habilidade){
            
            this.habilidade.update()

            if(this.habilidade.estado === estadoHab.pergunta)
                this.cortar()
            return;
        }
        this.cortar()
        this.pedirStop()

        if(Game.selfPlayer === Game.vez){
            this.comprar()
            this.trocarCarta()
            this.descartar()
        }
        
    }
    render(): void {
        for(let i = 0; i < this.mao.length; i++){
            this.mao[i].render()
        }

        this.comprada.render()
        
    }
}