import Multiplayer from "../../../connection/Multiplayer";
import Game from "../Game";
import { estadoHab } from "../types/estadoHab";

export default class Habilidade{
    
    id:number;
    playerID:number;
    estado:estadoHab = estadoHab.pergunta;

    constructor(id:number, playerID:number){
        this.id = id;
        this.playerID = playerID;
    }

    aceitar(){
        Multiplayer.enviarEvento("aceitarHabilidade",{  salaID:Game.salaID,
                                                        habilidadeID:this.id,
                                                        playerID:this.playerID})
    }
    negar(){
        Multiplayer.enviarEvento("negarHabilidade",{    salaID:Game.salaID,
                                                        habilidadeID:this.id,
                                                        playerID:this.playerID})
    }

    perguntar(){
        if(this.estado !== estadoHab.pergunta)
            return;

        const botaoAceitar = Game.botoes.get("aceitarH")!
        const botaoNegar = Game.botoes.get("negarH")!

        if(botaoAceitar.colisao()){
            this.estado = estadoHab.aguardo
            Game.setButtonView(["aceitarH", "negarH"], false)
            this.aceitar()
        }
        else if(botaoNegar.colisao()){
            this.estado = estadoHab.aguardo
            Game.setButtonView(["aceitarH", "negarH"], false)
            
            this.negar()
        }
        
    }

    updateState(estado:number){
        
        if(estado === estadoHab.emUso && this.estado === estadoHab.aguardo){
            this.iniciarUso()
        }
        else if(estado === estadoHab.aplicar && this.estado === estadoHab.pronta){
            this.estado = estadoHab.aplicar
        }
    }
    update():void{};

    iniciarUso():void{};

    selecionarCarta():void{};

    enviar():void{};

    aplicarEfeito():void{};
}