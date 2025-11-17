<script lang="ts">
    import type { LayoutData } from "../$types";
	import { roomEventBus } from "$lib/refactor/core/RoomEventBus";
    import game from "$lib/refactor/Game";
    import Mouse from "$lib/refactor/system/Mouse";
	import { onMount } from "svelte";
	import PlayerInfo from "$lib/components/HUD/PlayerInfo.svelte";
	import { positionInfo, type Variant } from "./hud.helper";
	import StopButton from "$lib/components/HUD/StopButton.svelte";
	import DiscardButton from "$lib/components/HUD/DiscardButton.svelte";
	import { PlayerState } from "$lib/refactor/types/States";
	import { gameEventBus } from "$lib/refactor/core/GameEventBus";
	import RoomManager from "$lib/refactor/system/RoomManager";
	import type { GameInitDTO, JoinConfigDTO } from "$lib/refactor/types/socket/room.dto";
    
    let {data}:{data:LayoutData} = $props()
    let roomID = data.post.roomID as string;
    let identifier:number = -1;

    let playersInfo:{name:string, variant:Variant, shiny:boolean}[] = $state([])
    let showDiscard:boolean = $state(false);
    let showStop:boolean = $state(false);
    
    let roomManager:RoomManager = RoomManager.getInstance(roomID);

    function stopRequest(){
        gameEventBus.emit("player:stopRequest");
    }
    function discard(){
        gameEventBus.emit("player:discard");
    }

    function join( joinData: JoinConfigDTO){
        console.log(joinData);
        identifier = joinData.identifier;

        playersInfo = positionInfo(joinData);
        console.log(playersInfo);

        game.setup("gameScreen", joinData);
        if(identifier === joinData.host){

            roomEventBus.emit("client:gameInit");
        }
        const cachedGameData = roomManager.getGameData();
        if (cachedGameData) {
            console.log("Perdi", cachedGameData)
            init(cachedGameData);
        }
    }

    async function init(data: GameInitDTO){
        await game.load(data, roomManager);
    }

    function subscribeToRoomEvents(){
        roomEventBus.on("server:joinRoom", join)

        roomEventBus.on("server:gameInit", init)
        
    }

    function subscribeToGameEvents(){

        gameEventBus.on("network:dealFinish", ()=>{
            game.startSpy();
        })

        gameEventBus.on("network:spyFinish", ()=>{
            game.start();
        })

        gameEventBus.on("network:gameEnd", dto=>{
            const name = game.getPlayerName(dto.idWinner);
            console.log("Pontos:", dto.points)
            alert(name + " é o ganhador!")
        })

        gameEventBus.on("mainPlayer:stateChange",() =>{
            showDiscard = game.isMPState(PlayerState.EVAL_PILE);
            showStop = game.isMPState(PlayerState.TURN_START);
        })
        gameEventBus.on("game:passTurn", turnId=>{
            for(let i = 0; i < playersInfo.length; ++i){
                playersInfo[i].shiny = i === turnId;
            }
        })
    }

    onMount(()=>{
        
        subscribeToRoomEvents();
        subscribeToGameEvents();

        let userID = data.userID!;
        
        roomEventBus.emit('client:joinRoom', {roomID, userID});
        
        return () => {
            console.log("LIMPANDO LISTENERS ZUMBIS");
            // Remove exatamente os mesmos listeners que foram anexados
            roomEventBus.off("server:joinRoom");
            roomEventBus.off("server:gameInit");
            gameEventBus.off("mainPlayer:stateChange");
            gameEventBus.off("game:passTurn");
        };
    });

</script>

<section class="game_container">
    <canvas
        id="gameScreen" 
        onclick={(e)=>{ Mouse.clicked = e.button == 0}}
    
        onmousemove={(e)=>{
            Mouse.x = e.clientX;
            Mouse.y = e.clientY;
        }}>
    
    </canvas>
    <section class="hud_container">

        {#each playersInfo as {name, variant, shiny}}
            <PlayerInfo {name} {variant} {shiny}/>
        {/each}
        <StopButton onclick={stopRequest} visible={showStop}/>
        <DiscardButton onclick={discard} visible={showDiscard}/>
    </section>
</section>

<style>
    .game_container{
        position: relative;
        width: 100vw;
        height: 100vh;
        top:0;
        left:0;
    }
    canvas{
        width: 100%;
        height: 100%;
        position:absolute;
        z-index: 1;
        top:0;
        left:0;
        background-image: url('/game_bg.png');
        background-size: cover;
    }

    .hud_container {
        
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        pointer-events: none;
    }
    
</style>