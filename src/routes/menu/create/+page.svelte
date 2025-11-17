<script lang="ts">
  import Form from "./Form.svelte";
	import FooterNav from "$lib/components/FooterNav.svelte";
	import { goto } from "$app/navigation";
	import PageTitle from "$lib/components/PageTitle.svelte";
	import { showError } from "$lib/stores/errorStore";
	import type { ActionData } from "./$types";
	import type { ActionResult } from "@sveltejs/kit";

  let {formData}:{formData:ActionData} = $props();

  let numCards = $state(4);
  function handleCreate(event:MouseEvent){
    if(numCards < 1 || numCards > 6){
      showError("Number of cards must be between 1 and 6.")
      event.preventDefault()
    }
  }
  function handleSubmit(){
    return async ({result}:{result:ActionResult})=>{
      if(result.type === "success"){
        const data = result.data;
        
        if(data && data.sucesso){
          goto(`/room/${data.roomID}/lobby`)
        }
      }
      else if(result.type === "failure"){
        const data = result.data;
        showError(data!.mensagem)
      }
    }
  }

</script>


<main class = "gray_box">
  <section class = "container">
    
    <PageTitle>
      Create Room
    </PageTitle>
    <Form callBack={handleSubmit} bind:bind={numCards}/>
    
    <FooterNav  form="createRoom" 
                type="submit" 
                labelR="Create" 
                variant="create" 
                onclickR={handleCreate}
                onclickL={()=>{goto("/menu/list")}}/>
  
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