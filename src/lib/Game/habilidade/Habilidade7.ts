import Multiplayer from "../../../connection/Multiplayer";
import Game from "../Game";
import { estadoHab } from "../types/estadoHab";
import HabilidadeCompra from "./HabilidadeCompra";

export default class Habilidade7 extends HabilidadeCompra{
    
    cartaSelecionada:number = -1;
    playerSelecionado:number = -1;

    iniciarUso(): void {
        this.estado = estadoHab.compra;
    }

    selecionarCarta(): void {
        if(!this.estado)
            return;

        for(let i = 0; i < Game.nPlayers; i++){
            
            if(i === Game.selfPlayer)
                continue;

            let player = Game.getPlayer(i)
            let cartaSel = player.colisao()

            if(this.cartaSelecionada === -1 && cartaSel === -1){
                continue;
            }
            else if(cartaSel === this.cartaSelecionada && i === this.playerSelecionado){
                
                player.marcarCarta(this.cartaSelecionada, false)

                this.cartaSelecionada = -1
                this.playerSelecionado = -1

                this.estado = estadoHab.selecionar;
            }
            else if(!(cartaSel === -1 && this.cartaSelecionada !== -1)){
                
                player.marcarCarta(this.cartaSelecionada, false)
                
                this.cartaSelecionada = cartaSel
                this.playerSelecionado = i

                player.marcarCarta(this.cartaSelecionada, true)
                
                this.estado = estadoHab.pronta;
            }
        }
    }

    enviar(): void {
        if(this.cartaSelecionada === -1 || this.playerSelecionado === -1)
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
                playerAlvo:this.playerSelecionado,
                posAlvo:this.cartaSelecionada})
            Game.setButtonView(["confirmarH"], false)
            
        }
    }

    aplicarEfeito(): void {
        let player = Game.getPlayer(this.playerID);

        let playerAlvo = Game.getPlayer(this.playerSelecionado);

        playerAlvo.marcarCarta(this.cartaSelecionada, false)

        player.comprou = 0;
        this.estado = estadoHab.inativa;

        Multiplayer.enviarEvento("usouHabilidade", {salaID:Game.salaID,
                                                    habilidadeID:this.id,
                                                    playerID:this.playerID})
    }
}