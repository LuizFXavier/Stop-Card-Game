<script lang="ts">
	import { goto } from "$app/navigation";
	import FooterNav from "$lib/components/FooterNav.svelte";
	import PageTitle from "$lib/components/PageTitle.svelte";
	import { showError } from "$lib/stores/errorStore";
	import type { ActionResult } from "@sveltejs/kit";
	import type { Fields } from "./fields";
	
  import Form from "./Form.svelte";
  
  let formFields:Fields = $state({playerName:"", email:"", password:"", confirmP:""});

	function handleNext(event:MouseEvent): void {
    
    if(!formFields.playerName || !formFields.email || !formFields.password || !formFields.confirmP){
      event.preventDefault()
      showError("You must complete all fields.")
      return;
    }

    if(formFields.password !== formFields.confirmP){
      event.preventDefault()
      showError("The passwords don\'t match.")
      return;
    }
	}

  function handleSubmit(){
    return async ({result}:{result:ActionResult})=>{
      if(result.type === "success"){
        const data = result.data;
        
        if(data && data.sucesso){
          goto("/user/confirmInfo");
        }
      }
      else if(result.type === "failure"){
        const data = result.data;
        showError(data!.mensagem)
      }
    }
  }
</script>

<main>
  <PageTitle>
    Sign Up
  </PageTitle>

  <Form bind:fields={formFields} callback={handleSubmit}/>

  <FooterNav labelR="Next" 
              variant="next"
              onclickR={handleNext}
              onclickL={()=>{goto("/")}}
              form="signup"
              type="submit"/>
</main>

<style>

main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

</style>