import Game from "../Game";
import { estadoHab } from "../types/estadoHab";
import Habilidade from "./Habilidade";

export default class HabilidadeCompra extends Habilidade{

    podeDescartar:boolean = false;

    iniciarUso(): void {
        this.estado = estadoHab.compra;
    }

    update(){

        let player = Game.getPlayer(this.playerID)

        console.log("Estado:", this.estado)
                
        if(this.estado === estadoHab.pergunta){
            Game.setButtonView(["aceitarH", "negarH"], true)

            super.perguntar()
        }
        else if(this.estado === estadoHab.selecionar || this.estado === estadoHab.pronta){
            this.selecionarCarta()
        }
        else if(this.estado === estadoHab.compra){
            if(player.comprou){
                this.estado = estadoHab.selecionar
                this.botaoExtra()
            }
            else
                player.comprarPilha()
        }

        if(this.podeDescartar && player.comprou){
            // console.log("saaaaaaaaaaaaaaaaas")
            const botaoDescarte = Game.botoes.get("descartar")!
            if(botaoDescarte.colisao()){
                this.estado = estadoHab.aguardo;
                player.descartar();
            }
        }
        if(this.estado === estadoHab.pronta){
            Game.setButtonView(["confirmarH"], true)
            this.enviar()
        }
        else{
            Game.setButtonView(["confirmarH"], false)
        }

        if(this.estado === estadoHab.aplicar){
            console.log("Início Aplicar")
            this.aplicarEfeito()
        }
            
    }

    botaoExtra(){};
    proximoEstado(){};
}