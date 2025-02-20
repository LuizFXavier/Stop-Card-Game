import Game from "../Game";
import { estadoHab } from "../types/estadoHab";
import Habilidade from "./Habilidade";

export default class HabilidadeSel extends Habilidade{
    update(){
            
        if(this.estado === estadoHab.pergunta){
            Game.setButtonView(["aceitarH", "negarH"], true)

            super.perguntar()
        }
        else if(this.estado === estadoHab.selecionar || this.estado === estadoHab.pronta){
            this.selecionarCarta()
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
    iniciarUso(): void {
        this.estado = estadoHab.selecionar;
    }
    
    selecionarCarta(): void {}
}