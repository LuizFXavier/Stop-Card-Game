<script lang="ts">
    import type { LayoutData } from "../$types";
    import { roomEventBus } from "$lib/refactor/core/RoomEventBus";
	import { goto } from "$app/navigation";
	
    let {data}:{data:LayoutData} = $props()

    $effect(()=>{
        let roomID = data.post.roomID as string;
        let userID = "29"
        roomEventBus.emit('client:joinRoom', {roomID, userID})
        roomEventBus.on('server:gameStart', ()=>{
            goto( `/room/${roomID}/game`)
        })
    })
</script>

<h1>
    {data.post.roomID}
</h1>
<button onclick={()=>{roomEventBus.emit("client:gameStart")}}>
    Start
</button>