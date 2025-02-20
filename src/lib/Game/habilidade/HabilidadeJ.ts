import Multiplayer from "../../../connection/Multiplayer";
import Game from "../Game";
import { estadoHab } from "../types/estadoHab";
import HabilidadeSel from "./HabilidadeSel";

export default class HabilidadeJ extends HabilidadeSel{
    
    cartasSelecionadas:number[] = [];
    playersSelecionados:number[] = [];

    selecao:Map<number, number> = new Map();
    selfSel:number = -1;

    selecionarCarta(): void {
        if(!this.estado)
            return;

        for(let i = 0; i < Game.nPlayers; i++){

            let player = Game.getPlayer(i)
            let cartaSel = player.colisao()

            console.log("cartaSel:", cartaSel)

            if(cartaSel === -1)
                continue;

            if(this.playerID === i){
                if(this.selfSel === cartaSel){
                    player.marcarCarta(cartaSel, false)
                    this.estado = estadoHab.selecionar;

                    this.selfSel = -1
                }
                else{
                    player.marcarCarta(cartaSel, true)
                    this.selfSel = cartaSel
                }
            }

            else if(this.selecao.has(i)){

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
            else if(this.selecao.size < 1){
                player.marcarCarta(cartaSel, true)
                this.selecao.set(i, cartaSel)

            }
            if(this.selecao.size === 1 && this.selfSel !== -1)
                this.estado = estadoHab.pronta;
        }
    }

    enviar(): void {
        if(this.selecao.size !== 1 && this.selfSel === -1)
            return

        let botaoConfirmar = Game.botoes.get("confirmarH")!

        if(botaoConfirmar.colisao()){
            console.log("Enviar:", this.estado)

            this.playersSelecionados.push(this.playerID)
            this.cartasSelecionadas.push(this.selfSel)

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
        
        let player = Game.getPlayer(this.playerID);
        
        player.marcarCarta(this.selfSel, false)
        player.virarCarta(this.selfSel, true)

        this.estado = estadoHab.inativa;

        setTimeout(() => {

            player.virarCarta(this.selfSel, false)

            Multiplayer.enviarEvento("usouHabilidade", {salaID:Game.salaID,
                                                        habilidadeID:this.id,
                                                        playerID:this.playerID})
        }, 1000);

    }
}