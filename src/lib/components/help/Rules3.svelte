<script>
	import PageTitle from "./PageTitle.svelte";

    const listaDeRegras = [
        { 
            id: 'A', 
            descricao: 'Se um jogador descartar essa carta e alguém fizer um corte em cima dela, ele receberá uma carta extra.' 
        },
        { 
            id: '10²', 
            descricao: 'Jogada extra se a carta estava na mão do jogador.' 
        },
        {
            id:'',
            descricao: 'Descarte qualquer carta ao jogá-la junto com o coringa. Se o jogador terminar o jogo com ele na mão, deverá comprar uma carta e considerar o valor dela em seu total.'
        }
        
    ];

</script>
<PageTitle>
    Regras: Cartas na mão
</PageTitle>


<ul class="lista-regras">
    {#each listaDeRegras as regra}
        <li class="item-regra">
            {#if regra.id.length > 0}
            <span class="numero-carta">{regra.id}</span>
            {:else}
            <span class="numero-carta">

                <img src="/icons/joker_ic.png" alt="Joker" class="joker-icon"/>
            </span>
            {/if}
            <span class="chip-carta"></span>
            <p class="texto-regra">{regra.descricao}</p>
        </li>
    {/each}
</ul>

<style>
    .lista-regras {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1.75rem; /* Espaço entre as regras */
        width: 80%;
    }

    .item-regra {
        display: flex;
        align-items: flex-start; /* Alinha tudo verticalmente */
        gap: 1rem; /* Espaço entre o número, o chip e o texto */
    }

    .numero-carta {
        font-family: 'Rajdhani', sans-serif; /* Assumindo a fonte do projeto */
        font-size: 3cqw; /* Tamanho grande */
        font-weight: 700;
        color: white;
        flex-shrink: 0; /* Não encolhe */
        width: 2.5rem; /* Garante alinhamento (ajuste se precisar) */
        /* text-align: right; */
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .chip-carta {
        flex-shrink: 0; /* Não encolhe */
        width: 1.5rem; /* Tamanho do "chip" escuro */
        height: 1.5rem;
        /* margin-left: 5%; */
        background-color: #1a2428; /* Cor escura do chip (exemplo) */
        border-radius: 25%; /* Deixa o chip redondo como na imagem */
        box-shadow: inset 0 0.1rem 0.2rem rgba(0,0,0,0.5); /* Sombra interna */
    }

    .texto-regra {
        font-family: 'Rajdhani', sans-serif; /* Assumindo a fonte do projeto */
        font-size: 1.4rem; /* Tamanho do texto normal (ajuste se o 'rem' base for diferente) */
        color: #ddd; /* Cor do texto (cinza-claro) */
        line-height: 1.4;
        margin: 0; /* Remove margem padrão do <p> */
        font-weight: 600;
    }
    .joker-icon{
        height: 1.2em;
        width: auto;
        vertical-align: middle;      
        right: 0;
    }
</style>