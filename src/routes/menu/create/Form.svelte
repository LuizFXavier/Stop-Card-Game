<script>
	import FormField from "$lib/components/FormField.svelte";
  import Checkbox from '$lib/components/Checkbox.svelte';
    let regras = $state([
        { id: '6', label: '6', checked: false },
        { id: '8', label: '8', checked: false },
        { id: '10_1', label: '10¹', checked: false },
        { id: 'J', label: 'J', checked: false },
        { id: 'J_2', label: '', checked: false },
        { id: '7', label: '7', checked: false },
        { id: '9', label: '9', checked: false },
        { id: '10_2', label: '10²', checked: false },
        { id: 'Q', label: 'Q', checked: false },
        { id: 'A', label: 'A', checked: false }
    ]);
</script>
<form>

    <FormField id="roomPassword" label="Room Password" type = "password"/>

    <div class="number_field">
        <label for ="cards" >
        N° of Cards
        </label>
        <input id="cards" type="number" min="0" max="6"/>
    </div>    

    <div class="rules-grid">
      {#each regras as regra (regra.id)}
        <Checkbox bind:checked={regra.checked}>
          {#if regra.label.length > 0}
            {regra.label}
          {:else}
            <img src="/icons/joker_ic.png" alt="Joker" class="joker-icon"/>
          {/if}
        </Checkbox>
      {/each}
    </div>
</form>

<style>
.number_field{
  display: flex;
  height: 22%;
  width: 30%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2%;
}

label{
  color: white;
  font-size: 2cqw;
  margin-bottom: 1%;
  font-family: Rajdhani;
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
input{
  width: 50%;
  height: 100%;
  background: #1F2A2C;
  box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.8vw;
  color:white;
  font-family: Rajdhani;
  font-size:2cqw;
  border: none;
  text-align: center;
}
form {
  margin-top: 2%;
  width: 100%;
  /* height: 75%; */
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
}
.rules-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr); /* 4 colunas como na imagem */
    gap: 1rem 2rem; /* Gap vertical e horizontal */
    /* ... */
}
.joker-icon{
  height: 1em;
  width: auto;
  vertical-align: middle;      
}
</style>