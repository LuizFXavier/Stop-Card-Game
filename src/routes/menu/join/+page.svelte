<script lang="ts">
  import Form from "./Form.svelte";
	import FooterNav from "$lib/components/FooterNav.svelte";
	import { goto } from "$app/navigation";
	import PageTitle from "$lib/components/PageTitle.svelte";
	import { isHelpModalOpen } from "$lib/stores/helpStore";
	import { showError } from "$lib/stores/errorStore";

  let roomId = $state('')
  
	function handleJoin(): void {
    if(roomId.length === 0){
      showError("You must enter a room code.")
      return;
    }
    goto(`/room/${roomId}/lobby`)
    return;
		showError("It's not possible to join this room.")
	}
</script>

  
<main class = "gray_box">
  <section class = "container">
    
    <PageTitle>
      Join Room
    </PageTitle>
    
    <Form bind:roomId={roomId}/>
  
    <FooterNav labelR="Join" variant="confirm" onclickR={handleJoin} onclickL={()=>{goto("/menu/list")}}/>
  </section>
</main>


<style>

.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

</style>