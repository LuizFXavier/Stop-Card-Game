<script lang="ts">
    import type {colocacao} from "$lib/types/colocacao"
    let {colc}:{colc:colocacao[]} = $props()
</script>
<main>
    <title>
        Fim de jogo
    </title>
    <section>
        {#each colc as {playerName, pontos}, index}
            {#if index === 1}
                <div id="ganhador">
                    <h2>playerName         pontos</h2>
                </div>
            {:else}
                <div id="perdedores">
                    <h2>playerName         pontos</h2>
                </div>
            {/if}
            
        {/each}
    </section>
</main>

<style>
    #ganhador{
        font-size: 10%;
        color: red;
    }
    #perdedores{
        font-size: 5%;
        color: blue;
    }
    title{
        font-size: 20%;
    }

    main{
        width: 25%;
        height: 50%;
        padding: 2%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>