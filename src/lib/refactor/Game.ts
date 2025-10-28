import { AssetManager } from "./core/AssetManager";
import Player from "./gameObjects/Player";
import { GameRenderer } from "./system/GameRenderer";
import Mouse from "./system/Mouse";
import NetworkManager from "./system/NetworkManager";
import type { InitData, JoinData } from "./types/InitData";

class Game{
    
    private players:Player[] = [] // Estado do jogo

    private mainPlayerID:number = 0;
    private currentTurn:number = 0;

    public renderer!: GameRenderer;

    private assetManager!:AssetManager;

    private networkManager!:NetworkManager;

    public async initialize(canvasId:string, initData:InitData){
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const ctx = canvas.getContext('2d')!;
        
        this.assetManager = AssetManager.instance;
        await this.assetManager.loadAssets();
        
        this.renderer = new GameRenderer(ctx);
        this.networkManager = new NetworkManager();

        this.start(initData);
    }

    public setup(joinData:JoinData){
        this.mainPlayerID = joinData.identifier;
    }

    private start(initData:InitData){
        
        for(let i = 0; i < initData.cards.length; ++i){
            this.players.push(new Player(0, i * 300, i, initData.cards[i]));
        }
        console.log(this.renderer)

        this.loop();
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