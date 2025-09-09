<script lang="ts">
  let estado: "inicio" | "escolha_usuario" = $state('inicio')
</script>
<main class="main_background">
  <header class = "logo">
      <span class = "logo_span">
        STOP
      </span>
    
  </header>

  {#if estado == 'inicio'}
    <button class = "main_button" onclick={()=> estado = 'escolha_usuario'}>
      <span class="button_span">
        Play
      </span>
    </button>
  {:else}
    <button class = "main_button" onclick={()=> estado = 'inicio'}>
      <span class="button_span">
        Login/Sign Up
      </span>
    </button>

    <button class = "anonymous_button" onclick={()=> estado = 'inicio'}>
      <span class="button_span">
        Anonymously
      </span>
    </button>
  {/if}
</main>


<style>

.logo {
  width: 30%;
  height: 20%;
  margin-top: 2%;
  display: flex;
  background: #EF4637;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
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
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.main_button {
  margin-top: 15%;
  width: 20%;
  height: 10%;
  align-items: center;
  background: #018BF6;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  container-type: inline-size;
}

.button_span{
  color: white;
  font-size: 13.5cqw;
  font-family: Rajdhani;
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.anonymous_button {
  margin-top: 2%;
  width: 20%;
  height: 10%;
  align-items: center;
  background: #667A78;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  container-type: inline-size;
}
</style>