<script lang="ts">
    import Game from "$lib/Game/Game";
    import Mouse from "$lib/Game/input/Mouse";
    import image from "$lib/assets/do_meu_avo2.png"
	import { estadoSala } from "$lib/types/estadoSala";
	import Multiplayer from "../../../connection/Multiplayer";
    let {listaPlayers, playerName, salaID, roomState}:
        {listaPlayers:Map<number, string>, playerName:string, salaID:string, roomState:estadoSala} = $props()

    $effect(()=>{
        Multiplayer.startGameEvents()
        Game.spriteCarta = image;
        Game.start(salaID, listaPlayers, playerName)    
        
    })

</script>
<canvas 
    id="gameScreen" 
    onclick={(e)=>{ if(roomState !== estadoSala.game)
                        Mouse.clicou = false;
                    else
                        Mouse.clicou = e.button == 0}}
    onmousemove={(e)=>{
        Mouse.x = e.clientX;
        Mouse.y = e.clientY;
    }}>

</canvas>

<!-- <img src={image} alt="não foi"/> -->

<style>
    canvas{
        width: 100%;
        height: 100%;
        position:absolute;
        top:0;
        left:0;
    }
</style>