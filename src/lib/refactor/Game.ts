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

class Game{
    
    private players:Player[] = [] // Estado do jogo
    private mainPile!:Pile;
    private discard!:Discard;

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
        await this.assetManager.loadAssets();
        
        this.renderer = new GameRenderer(ctx);
        this.networkManager = new NetworkManager(this.mainPlayerID);

        this.start(initData);
    }

    private start(initData:InitData){
        
        for(let i = 0; i < initData.cards.length; ++i){
            this.players.push(new Player(0, i * 300, i, initData.cards[i]));
        }
        this.mainPile = new Pile(window.innerWidth * 3/4, window.innerHeight * 3/4);
        this.discard = new Discard(window.innerWidth * 3/4, window.innerHeight * 3/4);
        
        this.subscribeToGameEvents();
        this.subscribeToNetworkEvents();

        this.startTurn(initData.turnId)

        this.loop();
    }

    private subscribeToGameEvents(){
        gameEventBus.on("pile:buyStack", ()=>{
            this.discard.setClickable(false);
            gameEventBus.emit("game:buyStack");
        })

        gameEventBus.on("discard:buyDiscard", ()=>{
            this.mainPile.setClickable(false);
            gameEventBus.emit("game:buyDiscard");
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
        this.renderer.clear();

        for(let i = 0; i < this.players.length; ++i){
            this.renderer.drawPlayer(this.players[i]);
            this.players[i].update();
        }
        Mouse.clicked = false;

        requestAnimationFrame(()=>this.loop());
    }
}
const game = new Game();
export default game;