<script lang="ts">
	import { goto } from "$app/navigation";
	import { showError } from "$lib/stores/errorStore";
	import type { PageData, ActionData } from "./$types";
  import UserChoice from "./UserChoice.svelte";

  let {data, form}:{data:PageData, form:ActionData} = $props();
  let estado: "inicio" | "escolha_usuario" = $state('inicio');
  
  function onclick(){
    console.log(data);
    if(data.hasLogin){
      goto('/menu/list')
    }
    else{
      estado = 'escolha_usuario'
    }
  }

  $effect(()=>{
    if (form?.sucesso === false && form.mensagem) {
            showError(form.mensagem);
        }
  })
</script>
<main class="main_background">
  <header class = "logo">
      <span class = "logo_span">
        STOP
      </span>
    
  </header>
  
  {#if estado == 'inicio'}
  <button class = "main_button" onclick={onclick}>
    <span class="button_span">
        Play
      </span>
    </button>
    {:else}
    <UserChoice></UserChoice>
    {/if}
</main>


<style>
.main_background {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  
  background-image: url('/balatro_bg.gif');
  background-size: cover;
  background-position: center center;
  
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
}

.logo {
  width: 30%;
  height: 20%;
  margin-top: 2%;
  display: flex;
  background: #EF4637;
  box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: calc(1vw + 1vh);;
  text-align: center;
  justify-content: center;
  align-items: center;
  container-type: inline-size;
  /* container-name: logo-header; */
}

.logo_span {
  color: white;
  font-size: 35cqw;
  font-family: Rajdhani;
  font-weight: bolder;
  word-wrap: break-word;
  text-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
}

.main_button {
  margin-top: 15%;
  width: 20%;
  height: 10%;
  align-items: center;
  background: #018BF6;
  box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: calc(1vw + 1vh);
  container-type: inline-size;
}

.button_span{
  color: white;
  font-size: 15cqw;
  font-family: Rajdhani;
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
}
</style>