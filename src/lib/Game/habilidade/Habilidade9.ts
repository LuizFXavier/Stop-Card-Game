import Multiplayer from "../../../connection/Multiplayer";
import Game from "../Game";
import { estadoHab } from "../types/estadoHab";
import HabilidadeSel from "./HabilidadeSel";

export default class Habilidade9 extends HabilidadeSel{
    
    cartaSelecionada:number = -1;

    constructor(id:number, playerID:number) {
        super(id, playerID)
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
                cartaSel:this.cartaSelecionada})
            Game.setButtonView(["confirmarH"], false)
            // this.estado = estadoHab.inativa;
        }
    }
    aplicarEfeito(): void {
        let player = Game.getPlayer(this.playerID);

        player.marcarCarta(this.cartaSelecionada, false)
        player.virarCarta(this.cartaSelecionada, true)

        this.estado = estadoHab.inativa;

        setTimeout(() => {

            player.virarCarta(this.cartaSelecionada, false)

            Multiplayer.enviarEvento("usouHabilidade", {salaID:Game.salaID,
                                                        habilidadeID:this.id,
                                                        playerID:this.playerID})
        }, 1000);
    }
}