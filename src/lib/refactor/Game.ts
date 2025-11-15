import { AssetManager } from "./core/AssetManager";
import { gameEventBus } from "./core/GameEventBus";
import Card from "./gameObjects/Card";
import Discard from "./gameObjects/Discard";
import MainPlayer from "./gameObjects/MainPlayer";
import Pile from "./gameObjects/Pile";
import Player from "./gameObjects/Player";
import { GameRenderer } from "./system/GameRenderer";
import { LayoutSystem } from "./system/LayoutSystem";
import Mouse from "./system/Mouse";
import NetworkManager from "./system/NetworkManager";
import type { Rank, Suit } from "./types/CardProperties";
import type { InitData, JoinData } from "./types/InitData";
import type { PlayerState } from "./types/States";
import Button from "./UI/Button";

class Game{
    
    private canvas!:HTMLCanvasElement;
    private players:Player[] = [] // Estado do jogo
    private playerMap:Map<number, number> = new Map();
    private mainPile!:Pile;
    private discard!:Discard;
    private btnDiscard!:Button;

    private screen!:{width:number, height:number};

    private mainPlayerID:number = 0;
    private mainIndex:number = 0;
    private turnId:number = 0;

    public renderer!: GameRenderer;

    private layoutSystem!: LayoutSystem;

    private assetManager!:AssetManager;

    private networkManager!:NetworkManager;

    public setup(canvasId:string, screen:{width:number, height:number}, joinData:JoinData){

        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.screen = screen;

        Card.setGlobalDimesions(screen.width);

        this.layoutSystem = new LayoutSystem(window.innerWidth, window.innerHeight,
             Card.width, Card.height);

        this.createPlayers(joinData);
    }

    public async initialize(initData:InitData){

        const ctx = this.canvas.getContext('2d')!;
        
        this.assetManager = AssetManager.instance;
        await this.assetManager.loadAssets().then(()=>{

            this.renderer = new GameRenderer(ctx);
            this.networkManager = new NetworkManager(this.mainPlayerID);
    
            this.start(initData);
        });
        
    }

    private start(initData:InitData){
        
        const halfCardW = Card.width / 2;
        const halfCardH = Card.height / 2;

        this.mainPile = new Pile(this.layoutSystem.pilePos());
        this.discard = new Discard(window.innerWidth / 2 - halfCardW, window.innerHeight / 2 - halfCardH);

        this.discard.receiveCard(new Card(0,0));

        this.btnDiscard = new Button("player:discard", "#F00", 0, 500, 25, 15);

        this.createHands(initData);
        
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

    private createPlayers(joinData:JoinData){
        
        this.mainPlayerID = joinData.identifier;
        
        const playerList = joinData.players;

        playerList.sort((a, b)=>{return a.id - b.id});

        const mainIndex = playerList.map(a => a.id).indexOf(this.mainPlayerID);
        this.mainIndex = mainIndex;

        for(let i = 0; i < playerList.length; ++i){
            if(i == mainIndex){
                this.players.push(new MainPlayer(playerList[i].id, playerList[i].name))
            }
            else{
                this.players.push(new Player(playerList[i].id, playerList[i].name))
            }
            this.playerMap.set(playerList[i].id, i);
        }
        
        // Posiciona os jogadores em sentido antihorário ou um de frente para o outro, se for um duelo.
        let c = 0;
        let isTwoPlayers = playerList.length === 2 ? 1 : 0;
        for(let i = mainIndex; c < playerList.length + isTwoPlayers; i = (i+1) % playerList.length){
            const pos = this.layoutSystem.playerPos(c);

            this.players[i].setPosition(pos.x, pos.y, c % 2 == 0);
            
            c = c + 1 + isTwoPlayers;
        }

        console.log(this.players)
    }

    private createHands(initData:InitData){
        
        const playerCards = initData.playersCards;

        playerCards.sort((a, b)=>{return a.id - b.id});

        const mainIndex = playerCards.map(a => a.id).indexOf(this.mainPlayerID);

        let c = 0;
        for(let i = mainIndex; c < playerCards.length; ++c, i = (i+1) % playerCards.length){
            this.players[c].setHand(playerCards[i].cards)
        }
    }

    public mpState():PlayerState{
        return this.players[this.mainIndex].getState();
    }
    public isMPState(state:PlayerState){
        if(!this.players)
            return false;

        return this.mpState() === state;
    }
}
const game = new Game();
export default game;