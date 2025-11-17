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
	import type { PageData } from "./$types";
	import RoomManager from "$lib/refactor/system/RoomManager";
	import type { JoinConfigDTO } from "$lib/refactor/types/socket/room.dto";
	
    let {data}:{data:PageData} = $props();
    let roomID = data.post.roomID as string;

    let playerList:{id:number, name:string}[] = $state([]);
    let hostId:number = $state(0);
    let identifier:number = $state(0);

    
    let regras = $state([
        { id: '6', label: '6', checked: false },
        { id: '8', label: '8', checked: false },
        { id: '10', label: '10¹', checked: false },
        { id: 'J', label: 'J', checked: false },
        { id: 'coringa', label: '', checked: false },
        { id: '7', label: '7', checked: false },
        { id: '9', label: '9', checked: false },
        { id: 'tirar10', label: '10²', checked: false },
        { id: 'Q', label: 'Q', checked: false },
        { id: 'as', label: 'A', checked: false }
    ]);

    $effect(()=>{
        subscribeToRoomEvents();
        let roomManager:RoomManager = RoomManager.getInstance(roomID);    
        let userID = data.userID;
        console.log(userID)
        if(userID)
            roomEventBus.emit('client:joinRoom', {roomID, userID})

        return () => {
            console.log("LIMPANDO LISTENERS ZUMBIS");
            
            roomEventBus.off("server:joinRoom", handleJoin);
            roomEventBus.off("server:gameStart", handleGameStart);
        };
    })

    function handleJoin(data:JoinConfigDTO){
        console.log(data)
        playerList = data.players;
        playerList.sort((a, b)=>{return a.id - b.id})
        
        hostId = data.host;
        identifier = data.identifier;

        const rules = new Map(data.rules);
        regras.forEach(r=>{
            r.checked = rules.get(r.id) ? true : false;
        })
    }
    function handleGameStart(){
        goto( `/room/${roomID}/game`)
    }

    function subscribeToRoomEvents(){
        roomEventBus.on("server:joinRoom", handleJoin)
        roomEventBus.on('server:gameStart', handleGameStart)
    }

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