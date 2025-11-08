import { AssetManager } from "./core/AssetManager";
import { gameEventBus } from "./core/GameEventBus";
import Discard from "./gameObjects/Discard";
import Pile from "./gameObjects/Pile";
import Player from "./gameObjects/Player";
import { GameRenderer } from "./system/GameRenderer";
import Mouse from "./system/Mouse";
import NetworkManager from "./system/NetworkManager";
import type { Rank, Suit } from "./types/CardProperties";
import type { InitData, JoinData } from "./types/InitData";
import Button from "./UI/Button";

class Game{
    
    private players:Player[] = [] // Estado do jogo
    private mainPile!:Pile;
    private discard!:Discard;
    private btnDiscard!:Button;

    private mainPlayerID:number = 0;
    private turnId:number = 0;

    public renderer!: GameRenderer;

    private assetManager!:AssetManager;

    private networkManager!:NetworkManager;

    public setup(joinData:JoinData){
        this.mainPlayerID = joinData.identifier;
    }

    public async initialize(canvasId:string, initData:InitData){
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const ctx = canvas.getContext('2d')!;
        
        this.assetManager = AssetManager.instance;
        await this.assetManager.loadAssets().then(()=>{

            this.renderer = new GameRenderer(ctx);
            this.networkManager = new NetworkManager(this.mainPlayerID);
    
            this.start(initData);
        });
        
    }

    private start(initData:InitData){
        
        for(let i = 0; i < 1; ++i){
            this.players.push(new Player(300, 300, i, initData.cards[i]));
        }
        this.mainPile = new Pile(window.innerWidth * 3/4, window.innerHeight * 2.8/4);
        this.discard = new Discard(window.innerWidth * 2.5/4, window.innerHeight * 2.8/4);

        this.btnDiscard = new Button("player:discard", "#F00", 0, 500, 25, 15);
        
        this.subscribeToGameEvents();
        this.subscribeToNetworkEvents();

        this.startTurn(initData.turnId)

        this.loop();
    }

    private subscribeToGameEvents(){
        gameEventBus.on("pile:buyStack", ()=>{
            this.discard.setClickable(false);
            console.log("Compra da pilha")
            this.btnDiscard.show();
            gameEventBus.emit("game:buyStack");
        })

        gameEventBus.on("discard:buyDiscard", ()=>{
            this.mainPile.setClickable(false);
            gameEventBus.emit("game:buyDiscard");
        })

        gameEventBus.on("player:discard", ()=>{
            this.btnDiscard.hide();
            const card = this.players[this.mainPlayerID].discardCard();
            this.discard.receiveCard(card);
            console.log("Carta descartada:", card)
            gameEventBus.emit("game:discard");
        })
    }

    private subscribeToNetworkEvents(){
        gameEventBus.on("network:buyStack", ({playerId, card})=>{
            const rank:Rank = card.rank as Rank;
            const suit:Suit = card.suit as Suit;

            this.players[playerId].buyCard({rank, suit});
        })

        gameEventBus.on("network:buyDiscard", ({playerId, card})=>{
            const rank:Rank = card.rank as Rank;
            const suit:Suit = card.suit as Suit;
            
            this.players[playerId].buyCard({rank, suit});
        })

        gameEventBus.on("network:passTurn", ({turnId})=>this.startTurn(turnId))
    }

    private startTurn(turnId:number){
        this.turnId = turnId;

        if(turnId == this.mainPlayerID){
            this.mainPile.setClickable(true);
            this.discard.setClickable(true);
        }
    }

    private loop(){

        this.render();
        
        this.mainPile.update();
        this.discard.update();
        this.btnDiscard.update();
        for(let i = 0; i < this.players.length; ++i){
            this.players[i].update();
        }
        
        Mouse.clicked = false;

        requestAnimationFrame(()=>this.loop());
    }
    private render(){
        this.renderer.clear();
        this.renderer.drawButton(this.btnDiscard);
        this.renderer.drawPile(this.mainPile);
        this.renderer.drawDiscard(this.discard);

        for(let i = 0; i < this.players.length; ++i){
            this.renderer.drawPlayer(this.players[i]);
        }
    }
}
const game = new Game();
export default game;