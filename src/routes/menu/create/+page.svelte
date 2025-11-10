<script lang="ts">
  import Form from "./Form.svelte";
	import FooterNav from "$lib/components/FooterNav.svelte";
	import { goto } from "$app/navigation";
	import PageTitle from "$lib/components/PageTitle.svelte";

  function handleCreate(){
    
  }

</script>

<main class = "gray_box">
  <section class = "container">
    
    <PageTitle>
      Create Room
    </PageTitle>
    <Form/>
    <FooterNav labelR="Create" variant="create" onclickR={handleCreate} onclickL={()=>{goto("/menu/list")}}/>
  
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