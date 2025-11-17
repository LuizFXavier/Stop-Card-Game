<script lang="ts">
	import { goto } from "$app/navigation";
	import FooterNav from "$lib/components/FooterNav.svelte";
	import PageTitle from "$lib/components/PageTitle.svelte";
	import { showError } from "$lib/stores/errorStore";
	import type { ActionResult } from "@sveltejs/kit";
  import Form from "./Form.svelte";
  import type { Fields } from "./fields";

  let formFields:Fields = $state({email:"", password:""});

	function handleNext(): void {
		if(!formFields.email || !formFields.password){
      showError("You must complete all fields.")
      return;
    }
	}
  function handleSubmit(){
    return async ({result}:{result:ActionResult})=>{
      if(result.type === "success"){
        const data = result.data;
        
        if(data && data.sucesso){
          goto("/");
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
    Login
  </PageTitle>

  <Form fields={formFields} callback={handleSubmit}/>

  <FooterNav labelR="Next"
   variant="next" 
   onclickR={handleNext} 
   onclickL={()=>{goto("/")}}
   type="submit"
   form="login"/>
  
</main>

<style>

main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

</style>