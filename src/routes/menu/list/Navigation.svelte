<script>
	import { goto } from "$app/navigation";
  import SmButton from "$lib/components/SmButton.svelte";

</script>

<main class="container">

  <SmButton color="#EF4637" onclick={()=>{goto("/")}}>
    Back
  </SmButton>
  
  <SmButton color="#9E74CE" onclick={()=>{goto("/menu/create")}}>
    Create Room
  </SmButton>

  <SmButton color="#36AF80" onclick={()=>{goto("/menu/join")}}>
    Join Private
  </SmButton>

</main>

<style>
.container{
    height: 20%;
    width: 75%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>