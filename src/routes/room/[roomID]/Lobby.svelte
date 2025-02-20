<script lang="ts">
    import { browser } from "$app/environment";
    import Multiplayer from "../../../connection/Multiplayer";
    let {salaID, listaPlayers, configRegras, isHost}:
    {salaID:string, listaPlayers:Map<number, string>, configRegras:Map<string,number>, isHost:boolean} = $props()
</script>

<main>
    <h1>
        ID da sala: {salaID}
    </h1>
    <h1>
        Jogadores:
    </h1>

    {#each listaPlayers.entries() as [k, v]}
        <h2>
            {v}
        </h2>
    {/each}
    
    <h2>
        Regras: 
    </h2>
    
    {#each configRegras as [k, v]}
        <h3>
            {k}:{#if v === 0}
                    não
                {:else if v === 1}
                    sim
                {:else}
                     {v}
            {/if}
        </h3>
    {/each}

    {#if isHost}
    <button onclick={()=>{Multiplayer.socket!.emit("gameStart", salaID)}}>Começar jogo</button>
    {/if}
</main>