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
    
    let {data}:{data:LayoutData} = $props()

    let playersInfo:{name:string, variant:Variant, shiny:boolean}[] = $state([])
    let showDiscard:boolean = $state(false);
    let showStop:boolean = $state(false);

    function stopRequest(){

    }
    function discard(){
        gameEventBus.emit("player:discard");
    }

    onMount(()=>{
        roomEventBus.on("server:joinRoom", data =>{
            playersInfo = positionInfo(data);
            console.log(playersInfo);
            game.setup("gameScreen", {width:screen.width, height:screen.height}, data);
            roomEventBus.emit("client:gameInit");
        })

        roomEventBus.on("server:gameInit", data =>{
            game.initialize(data);
        })
        gameEventBus.on("mainPlayer:stateChange",() =>{
            showDiscard = game.isMPState(PlayerState.EVAL_PILE);
            showStop = game.isMPState(PlayerState.TURN_START);
        })
        gameEventBus.on("game:turnPass", turnId=>{
            for(let i = 0; i < playersInfo.length; ++i){
                playersInfo[i].shiny = i === turnId;
            }
        })

        let roomID = data.post.roomID as string;
        let userID = "29";
        
        roomEventBus.emit('client:joinRoom', {roomID, userID});
        
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