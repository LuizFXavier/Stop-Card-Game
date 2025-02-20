import Carta from "./GameObject/Carta";
import Descarte from "./GameObject/Descarte";
import Pilha from "./GameObject/Pilha";
import Player from "./GameObject/Player";
import type Habilidade from "./habilidade/Habilidade";
import Mouse from "./input/Mouse";
import { estadoHab } from "./types/estadoHab";
import Botao from "./UI/Botao";

export default class Game{

    public static ctx:CanvasRenderingContext2D;

    public static selfPlayer:number = -1;

    public static salaID:string;
    
    public static vez:number;

    public static spriteCarta:string;
    
    private static players:Player[] = [];
    public static pilha:Pilha;
    public static descarte:Descarte;
    public static pilhaCorte:Descarte;
    public static nPlayers:number = 0;

    public static botoes:Map<string, Botao> = new Map();

    public static render(){
        Game.ctx.fillStyle = "#663399"
        Game.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

        for(let i = 0; i < this.players.length; i++){
            this.players[i].render() 
        }

        this.pilha.render()

        this.descarte.render()

        this.pilhaCorte.render()

        this.botoes.forEach((botao)=>{
            botao.render()
        })
    }

    public static update(){
        this.players[Game.selfPlayer].update()
    }

    public static loop(){
        Game.render()
        Game.update()

        Mouse.clicou = false;

        window.requestAnimationFrame(()=>Game.loop())
    }

    public static start(salaID:string, playerNames:Map<number, string>, playerName:string){
        
        console.log("Nome:", playerName)
        const canvas = document.getElementById("gameScreen") as HTMLCanvasElement;

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        
        Game.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        this.salaID = salaID;

        Game.criarPlayers(playerNames, playerName);
        console.log("Criou os players!")
        // console.log(this.players)

        console.log(this.selfPlayer);

        this.pilha = new Pilha(0, 0)

        this.descarte = new Descarte(
            (window.innerWidth - Carta.LARGURA) /2,
            (window.innerHeight - Carta.ALTURA) /2
        )
        this.pilhaCorte = new Descarte(
            (window.innerWidth + Carta.LARGURA) /2,
            (window.innerHeight - Carta.ALTURA) /2
        )

        console.log(this.botoes)
        
        this.criaBotoes()
        
        Game.loop()
    }

    public static end(pontuacoes:number[], ganhador:number){
        for(let i =0; i < this.players.length; i++){
            this.players[i].pontos = pontuacoes[i];
            this.players[i].desvirarTodas()
        }
    }

    public static updatePlayers(players:Player[], habilidade:Habilidade){
        for(let i = 0; i < this.players.length; i++){
            this.players[i].setCartas(players[i])
        }
        if(!habilidade)
            return
        
        console.log("Estado:", habilidade.estado)

        if(habilidade.estado !== estadoHab.inativa)
            this.players[habilidade.playerID].setHabilidade(habilidade)
        else
            this.players[habilidade.playerID].encerrarHabilidade()
    }

    public static getPlayer(id:number){
        return this.players[id]
    }

    public static updatePilhas(cartasDescarte:Carta[], pilhaCorte:Carta[], nCartasPilha:number){
        
        this.descarte.updateCartas(cartasDescarte)
        this.pilhaCorte.updateCartas(pilhaCorte)
        this.pilha.updateCartas(nCartasPilha)
    }

    public static updateVez(vez:number){
        Game.vez = vez;
    }

    public static setButtonView(nomes:string[], visivel:boolean){

        for(let i = 0; i < nomes.length; i++)
            this.botoes.get(nomes[i])!.visivel = visivel;
    }

    private static criarPlayers(listaPlayers:Map<number, string>, playerName:string){

        listaPlayers.forEach((nome, id)=>{

            if(Game.selfPlayer === -1 && playerName === nome)
               Game.selfPlayer = id; 

            this.players[id] = new Player(0, 0, nome, id)
        })

        let f = 0;

        for(let i = Game.selfPlayer; f < Game.players.length; i = (i+1) % Game.players.length){
            
            // Posicionamento dos players um de frente pro outro
            if(Game.players.length === 2){
                this.players[i].posicionarPlayer(
                    window.innerWidth / 2,
                    window.innerHeight * (1 - 1/4 - (f%2) *(1/2))
                )
            }
            // Posicionamento dos players em sentido horário
            else{
                this.players[i].posicionarPlayer(
                    window.innerWidth * (((f%2) * (1 - f/4)) + (1 - (f%2)) / 2),
                    window.innerHeight * ((f%2)/2 + (1 - f%2) * (1 - (f + 1)/4))
                )
            }
            f++;
            console.log("Posicionou um jogador")
        }

        Game.nPlayers = Game.players.length;
    }

    private static criaBotoes(){
        this.botoes.set("descartar", new Botao("descartar", "#F02039",
            window.innerWidth / 5,
            window.innerHeight * 0.8,
            50,
            50
            ));

        this.botoes.set("aceitarH", new Botao("aceitarH", "#2e6930",
            window.innerWidth / 5 - 75,
            window.innerHeight * 0.8,
            50,
            50
            ));

        this.botoes.set("negarH", new Botao("negarH", "#B22222",
            window.innerWidth / 5 - 20,
            window.innerHeight * 0.8,
            50,
            50
            ));

        this.botoes.set("confirmarH", new Botao("confimarH", "#0041c2",
            window.innerWidth / 5 - 75,
            window.innerHeight * 0.8,
            105,
            50
            ));

        this.botoes.set("stop", new Botao("stop", "#100200",
            window.innerWidth * 0.8,
            window.innerHeight * 0.8,
            105,
            50
            ));
        this.setButtonView(["stop"], true)
    }

}