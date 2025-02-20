import Multiplayer from "../../../connection/Multiplayer";
import Game from "../Game";
import { estadoHab } from "../types/estadoHab";
import HabilidadeSel from "./HabilidadeSel";

export default class HabilidadeQ extends HabilidadeSel{
    
    cartasSelecionadas:number[] = []
    playersSelecionados:number[] = []

    selecao:Map<number, number> = new Map()

    selecionarCarta(): void {
        if(!this.estado)
            return;

        for(let i = 0; i < Game.nPlayers; i++){

            let player = Game.getPlayer(i)
            let cartaSel = player.colisao()

            console.log("cartaSel:", cartaSel)

            if(cartaSel === -1)
                continue;

            if(this.selecao.has(i)){

                if(this.selecao.get(i) === cartaSel){
                    player.marcarCarta(cartaSel, false)

                    this.selecao.delete(i)
                    this.estado = estadoHab.selecionar;
                }
                else{
                    player.marcarCarta(this.selecao.get(i)!, false)
                    player.marcarCarta(cartaSel, true)
                    this.selecao.set(i, cartaSel)
                }
            }
            else if(this.selecao.size < 2){
                player.marcarCarta(cartaSel, true)
                this.selecao.set(i, cartaSel)

                if(this.selecao.size === 2)
                    this.estado = estadoHab.pronta;
            }
            // if(this.cartaSelecionada === -1 && cartaSel === -1){
            //     player.marcarCarta(this.cartaSelecionada, false)
            // }
            // else if(cartaSel === this.cartaSelecionada && i === this.playerSelecionado){
                
            //     player.marcarCarta(this.cartaSelecionada, false)

            //     this.cartaSelecionada = -1
            //     this.playerSelecionado = -1

            //     this.estado = estadoHab.selecionar;
            // }
            // else if(!(cartaSel === -1 && this.cartaSelecionada !== -1)){
                
            //     player.marcarCarta(this.cartaSelecionada, false)
                
            //     this.cartaSelecionada = cartaSel
            //     this.playerSelecionado = i

            //     player.marcarCarta(this.cartaSelecionada, true)
                
            //     this.estado = estadoHab.pronta;
            // }
        }
    }

    enviar(): void {
        if(this.selecao.size !== 2)
            return

        let botaoConfirmar = Game.botoes.get("confirmarH")!

        if(botaoConfirmar.colisao()){
            console.log("Enviar:", this.estado)

            this.selecao.forEach((carta, player)=>{
                this.playersSelecionados.push(player)
                this.cartasSelecionadas.push(carta)
            })

            Multiplayer.enviarEvento("enviarHabilidade",{
                salaID:Game.salaID,
                playerID:this.playerID,
                habilidadeID:this.id,
            },
                {
                players:this.playersSelecionados,
                cartas:this.cartasSelecionadas
                })
            Game.setButtonView(["confirmarH"], false)
            // this.estado = estadoHab.inativa;
        }
    }

    aplicarEfeito(): void {

        this.selecao.forEach((carta, player)=>{
            Game.getPlayer(player).marcarCarta(carta, false)
        })

        Multiplayer.enviarEvento("usouHabilidade", {salaID:Game.salaID,
            habilidadeID:this.id,
            playerID:this.playerID})

        this.estado = estadoHab.inativa;

    }
}