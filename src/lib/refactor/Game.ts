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
import type RoomManager from "./system/RoomManager";
import type { Rank, Suit } from "./types/CardProperties";
import type { InitData, JoinData } from "./types/InitData";
import type { GameInitDTO, JoinConfigDTO } from "./types/socket/room.dto";
import { PlayerState } from "./types/States";
import { wait } from "./utils/time";

class Game{
    
    private canvas!:HTMLCanvasElement;
    private players:Player[] = [] // Estado do jogo
    private playerMap:Map<number, number> = new Map();
    private mainPile!:Pile;
    private discard!:Discard;
    private cutPile!:Discard;
    private hasSetup:boolean = false;
    private hasLoad:boolean = false;


    private mainPlayerID:number = 0;
    private mainIndex:number = 0;
    private turnId:number = 0;

    public renderer!: GameRenderer;

    private layoutSystem!: LayoutSystem;

    private assetManager!:AssetManager;

    private networkManager!:NetworkManager;

    public setup(canvasId:string, joinData:JoinConfigDTO){
        if(this.hasSetup){
            return;
        }
        this.hasSetup = true;

        console.log("Fez setup")
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        Card.setGlobalDimesions(window.innerWidth);

        this.layoutSystem = new LayoutSystem(window.innerWidth, window.innerHeight,
             Card.width, Card.height);
        
        this.createPlayers(joinData);
        console.log(this.players)
    }

    public async load(initData:GameInitDTO, roomManager:RoomManager){

        if(this.hasLoad){
            return;
        }
        this.hasLoad = true;

        if(!this.canvas){
            this.canvas = document.getElementById("gameScreen") as HTMLCanvasElement;
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        const ctx = this.canvas.getContext('2d')!;
        console.log("Load game")
        this.assetManager = AssetManager.instance;
        await this.assetManager.loadAssets().then(()=>{

            this.renderer = new GameRenderer(ctx);
            this.networkManager = new NetworkManager(roomManager, this.mainPlayerID);
    
            this.initialize(initData);
        });
        
    }

    public getPlayerName(playerID:number){
        const index = this.playerMap.get(playerID)!;

        return this.players[index].getName();
    }

    private async initialize(initData:GameInitDTO){
        
        const halfCardW = Card.width / 2;
        const halfCardH = Card.height / 2;

        this.mainPile = new Pile(this.layoutSystem.pilePos());
        this.discard = new Discard(window.innerWidth / 2 - halfCardW, window.innerHeight / 2 - halfCardH);
        this.cutPile = new Discard(this.discard.x, this.discard.y);
        console.log("Init data", initData)

        this.createHands(initData);
        
        console.log("Initialize game")
        this.turnId = initData.turn;
        
        this.subscribeToGameEvents();
        this.subscribeToNetworkEvents();
        
        this.loop();
        await this.dealState().then(()=>{
            gameEventBus.emit("game:dealFinish")
        });

    }

    public async startSpy(){
        await this.spyState().then(()=>{
            gameEventBus.emit("game:spyFinish")
        });
    }

    public start(){
        console.log("Start game")

        this.passTurn(this.turnId);
    }

    private subscribeToGameEvents(){
        gameEventBus.on("pile:buyStack", ()=>{
            this.discard.setClickable(false);
            console.log("Compra da pilha")
            
            gameEventBus.emit("game:buyStack");
        })

        gameEventBus.on("discard:buyDiscard", ()=>{
            this.mainPile.setClickable(false);
            gameEventBus.emit("game:buyDiscard");
        })

        gameEventBus.on("player:discard", ()=>{

            gameEventBus.emit("game:discard");
        })
        gameEventBus.on("player:cut", cardIndex=>{
            gameEventBus.emit("game:cut", cardIndex)
        })
        gameEventBus.on("player:exchangeCard", cardIndex=>{

            gameEventBus.emit("game:exchangeCard", cardIndex);
        })

        gameEventBus.on("mainPlayer:stateChange", ()=>{
            if(this.isMPState(PlayerState.IDLE)){
                gameEventBus.emit("game:endTurn");
            }
        })
        gameEventBus.on("player:stopRequest", ()=>{

            gameEventBus.emit("game:stopRequest");
        })
    }

    private subscribeToNetworkEvents(){
        gameEventBus.on("network:buyStack", ({playerId, card})=>{
            const rank:Rank = card.rank as Rank;
            const suit:Suit = card.suit as Suit;

            const index = this.playerMap.get(playerId)!;
            this.players[index].buyCard({rank, suit}, "pile");
        })

        gameEventBus.on("network:buyDiscard", ({playerId, card})=>{
            const rank:Rank = card.rank as Rank;
            const suit:Suit = card.suit as Suit;

            const index = this.playerMap.get(playerId)!;
            
            this.players[index].buyCard({rank, suit}, "discard");
            this.discard.removeTop();
        })
        
        gameEventBus.on("network:exchangeCard", dto=>{
            const index = this.playerMap.get(dto.playerID)!;

            const player = this.players[index];
            const card = player.exchangeCard(dto.indexCard);
            this.discard.receiveCard(card);
            player.endTurn();
        })
        gameEventBus.on("network:discard", ()=>{

            const player = this.players[this.turnId];
            const card = player.discardCard();
            this.discard.receiveCard(card);
        })

        gameEventBus.on("network:passTurn", ({turn})=>this.passTurn(turn))

        gameEventBus.on("network:successCut", dto=>{

            const index = this.playerMap.get(dto.playerID)!;
            const player = this.players[index];
            const card = player.cut(dto.indexCard);
            this.discard.receiveCard(card);
        })
        gameEventBus.on("network:wrongCut", async dto=>{

            const index = this.playerMap.get(dto.playerID)!;
            const player = this.players[index];
            const penaltyCard = dto.penaltyCard as {rank:Rank, suit:Suit};
            
            player.hideCard(dto.indexCard)

            const playerCard = player.getCard(dto.indexCard);
            this.cutPile.receiveCard(new Card(playerCard.rank, playerCard.suit));

            await wait(1000).then(()=>{
                this.cutPile.removeTop();
                player.showCard(dto.indexCard);
                player.receivePenalty(penaltyCard);
            })

        })
    }

    private passTurn(turn:number){
        this.turnId = turn % this.players.length;

        if(this.turnId == this.mainIndex){
            const mainPlayer = this.players[this.mainIndex];
            mainPlayer.startTurn();
            this.mainPile.setClickable(true);
            this.discard.setClickable(true);
        }
        gameEventBus.emit("game:passTurn", this.turnId)
    }

    private async dealState(){
        console.log("Deal state")

        for (const p of this.players) {
            
            for (const c of p.hand) {
                c.setValid(true);
                
                await wait(200);
            }
        }
    }

    private async spyState(){
        console.log("Spy state")
        
        this.players.forEach(p=>{
            p.startSpy();
        })
        await wait(1000);
        this.players.forEach(p=>{
            p.endSpy();
        })
    }

    private loop(){

        this.render();
        
        this.mainPile.update();
        this.discard.update();
        for(let i = 0; i < this.players.length; ++i){
            this.players[i].update();
        }
        
        Mouse.clicked = false;

        requestAnimationFrame(()=>this.loop());
    }
    private render(){
        this.renderer.clear();
        this.renderer.drawPile(this.mainPile);
        this.renderer.drawDiscard(this.discard);
        this.renderer.drawDiscard(this.cutPile);

        for(let i = 0; i < this.players.length; ++i){
            this.renderer.drawPlayer(this.players[i]);
        }
    }

    private createPlayers(joinData:JoinConfigDTO){
        
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

            this.players[i].setPosition(pos.x, pos.y, c);
            
            c = c + 1 + isTwoPlayers;
        }

    }

    private createHands(initData:GameInitDTO){
        
        const playerCards = initData.playersCards;

        playerCards.sort((a, b)=>{return a.id - b.id});

        const mainIndex = playerCards.map(a => a.id).indexOf(this.mainPlayerID);

        let c = 0;
        for(let i = mainIndex; c < playerCards.length; ++c, i = (i+1) % playerCards.length){
            const cards = playerCards[i].cards as {rank:Rank, suit:Suit}[];
            this.players[i].setHand(cards);
        }
    }

    public mpState():PlayerState{
        return this.players[this.mainIndex].getState();
    }
    public isMPState(state:PlayerState){
        if(this.players.length === 0)
            return false;
        return this.mpState() === state;
    }
}
const game = new Game();
export default game;