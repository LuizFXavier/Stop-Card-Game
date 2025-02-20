import Multiplayer from "../../../connection/Multiplayer";
import Game from "../Game";
import { estadoHab } from "../types/estadoHab";
import HabilidadeCompra from "./HabilidadeCompra";

export default class Habilidade8 extends HabilidadeCompra{
    
    cartaSelecionada:number = -1;

    botaoExtra(): void {
        let valor = Game.getPlayer(this.playerID).getValorComprada();

        if(valor === 8){
            this.podeDescartar = true;
            Game.setButtonView(["descartar"], true)
        }else{
            this.podeDescartar = false;
            Game.setButtonView(["descartar"], false)
        }
    }

    selecionarCarta(): void {

        if(!this.estado)
            return;

        let cartaSel = Game.getPlayer(this.playerID).colisao()
        
        if(cartaSel === this.cartaSelecionada){
            
            Game.getPlayer(this.playerID).marcarCarta(this.cartaSelecionada, false)

            this.cartaSelecionada = -1

            this.estado = estadoHab.selecionar;
        }
        else if(!(cartaSel === -1 && this.cartaSelecionada !== -1)){
            
            Game.getPlayer(this.playerID).marcarCarta(this.cartaSelecionada, false)
            
            this.cartaSelecionada = cartaSel;

            Game.getPlayer(this.playerID).marcarCarta(this.cartaSelecionada, true)
            
            this.estado = estadoHab.pronta;
        }
    }

    enviar(): void {
        if(this.cartaSelecionada === -1)
            return

        let botaoConfirmar = Game.botoes.get("confirmarH")!

        if(botaoConfirmar.colisao()){
            console.log("Enviar:", this.estado)

            Multiplayer.enviarEvento("enviarHabilidade",{
                salaID:Game.salaID,
                playerID:this.playerID,
                habilidadeID:this.id
            }, {
                playerOrigem:this.playerID,
                playerAlvo:this.playerID,
                posAlvo:this.cartaSelecionada})
            Game.setButtonView(["confirmarH"], false)
            
        }
    }

    aplicarEfeito(): void {
        let player = Game.getPlayer(this.playerID);

        player.marcarCarta(this.cartaSelecionada, false)

        player.comprou = 0;
        this.estado = estadoHab.inativa;

        this.botaoExtra()

        Multiplayer.enviarEvento("usouHabilidade", {salaID:Game.salaID,
                                                    habilidadeID:this.id,
                                                    playerID:this.playerID})
    }
}