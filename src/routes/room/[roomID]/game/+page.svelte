<script lang="ts">
    import type { LayoutData } from "../$types";
	import { roomEventBus } from "$lib/refactor/core/RoomEventBus";
    import game from "$lib/refactor/Game";
    import Mouse from "$lib/refactor/system/Mouse";
    
    let {data}:{data:LayoutData} = $props()

    $effect(()=>{
        roomEventBus.on("server:joinRoom", data =>{
            game.setup(data);
            roomEventBus.emit("client:gameInit");
        })

        roomEventBus.on("server:gameInit", data =>{
            game.initialize("gameScreen", data);
        })
        

        let roomID = data.post.roomID as string;
        let userID = "29";
        
        roomEventBus.emit('client:joinRoom', {roomID, userID});
        
        
    });

</script>

<canvas
    id="gameScreen" 
    onclick={(e)=>{ Mouse.clicked = e.button == 0}}

    onmousemove={(e)=>{
        Mouse.x = e.clientX;
        Mouse.y = e.clientY;
    }}>

</canvas>

<style>
    canvas{
        width: 100%;
        height: 100%;
        position:absolute;
        top:0;
        left:0;
        background-color: rebeccapurple;
    }
</style>