<script lang="ts">
    import type { LayoutData } from "../$types";
    import { roomEventBus } from "$lib/refactor/core/RoomEventBus";
	import { goto } from "$app/navigation";
	import PageTitle from "$lib/components/PageTitle.svelte";
	import FooterNav from "$lib/components/FooterNav.svelte";
	import PlayerList from "./PlayerList.svelte";
	import HelpButton from "$lib/components/help/HelpButton.svelte";
	import HelpModal from "$lib/components/help/HelpModal.svelte";
	import RulesGrid from "./RulesGrid.svelte";
	
    let {data}:{data:LayoutData} = $props();
    let roomID = data.post.roomID as string;

    let playerList = $state(["Shazam 1", "Luigi"]);
    let regras = $state([
        { id: '6', label: '6', checked: true },
        { id: '8', label: '8', checked: false },
        { id: '10_1', label: '10¹', checked: false },
        { id: 'J', label: 'J', checked: false },
        { id: 'J_2', label: '', checked: false },
        { id: '7', label: '7', checked: false },
        { id: '9', label: '9', checked: false },
        { id: '10_2', label: '10²', checked: false },
        { id: 'Q', label: 'Q', checked: false },
        { id: 'A', label: 'A', checked: false }
    ]);

    $effect(()=>{
        let userID = "29"
        roomEventBus.emit('client:joinRoom', {roomID, userID})
        roomEventBus.on('server:gameStart', ()=>{
            goto( `/room/${roomID}/game`)
        })
    })

    function handleStart(){
        roomEventBus.emit("client:gameStart")
    }
    function handleBack(){
        goto("/menu/list")
    }
</script>

<main class="faded_background">
    <HelpButton/>
    <HelpModal/>
    <section class="gray_box container">
        <PageTitle>
            Room {roomID}
        </PageTitle>
        <PlayerList {playerList}/>
        <RulesGrid {regras}/>
        <FooterNav onclickL={handleBack} onclickR={handleStart} variant="next" labelR="Start"/>
    </section>
    
</main>

<style>
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:2.5rem;
}
</style>