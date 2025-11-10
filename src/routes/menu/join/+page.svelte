<script lang="ts">
  import Form from "./Form.svelte";
	import FooterNav from "$lib/components/FooterNav.svelte";
	import { goto } from "$app/navigation";
	import PageTitle from "$lib/components/PageTitle.svelte";


	function handleJoin(): void {
		throw new Error("Function not implemented.");
	}
</script>

<main class = "gray_box">
  <section class = "container">
    
    <PageTitle>
      Join Room
    </PageTitle>
    
    <Form/>
  
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