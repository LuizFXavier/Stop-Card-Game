<script lang="ts">
	import Checkbox from "$lib/components/Checkbox.svelte";

    let {regras = $bindable()} = $props();

</script>

<div class="rules-grid">
      {#each regras as regra (regra.id)}
        <Checkbox bind:checked={regra.checked} disabled={true}>
          {#if regra.label.length > 0}
            {regra.label}
          {:else}
            <img src="/icons/joker_ic.png" alt="Joker" class="joker-icon"/>
          {/if}
        </Checkbox>
      {/each}
</div>

<style>
.rules-grid {
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 1rem 2rem; /* Gap vertical e horizontal */

}
.joker-icon{
  height: 1em;
  width: auto;
  vertical-align: middle;      
}
</style>