<script lang="ts">
    import type { LayoutData } from "../$types";
    import { roomEventBus } from "$lib/refactor/core/RoomEventBus";
	import { goto } from "$app/navigation";
	import PageTitle from "$lib/components/PageTitle.svelte";
	
    let {data}:{data:LayoutData} = $props()
    let roomID = data.post.roomID as string;

    $effect(()=>{
        let userID = "29"
        roomEventBus.emit('client:joinRoom', {roomID, userID})
        roomEventBus.on('server:gameStart', ()=>{
            goto( `/room/${roomID}/game`)
        })
    })
</script>

<main class="faded_background">
    <section class="gray_box">
        <PageTitle>
            Room {roomID}
        </PageTitle>
    </section>
    <button onclick={()=>{roomEventBus.emit("client:gameStart")}}>
        Start
    </button>
</main>