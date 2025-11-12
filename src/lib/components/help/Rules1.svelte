<script>
	import PageTitle from "./PageTitle.svelte";

    const listaDeRegras = [
        { 
            id: '6', 
            descricao: 'Inverte a direção do jogo. De horário para anti-horário e vice-versa.' 
        },
        { 
            id: '7', 
            descricao: 'Compre uma carta do monte, veja e troque por uma das cartas viradas de um adversário.' 
        },
        { 
            id: '8', 
            descricao: 'Compre do monte e troque com uma de suas cartas, obrigatoriamente. Com a excessão de que se a nova carta for outro 8, nesse caso se pode usar novamente a habilidade.' 
        }
        // Podes adicionar as outras regras (9, 10, J, Q, A) aqui
    ];

</script>
<PageTitle>
    Regras: Cartas compradas
</PageTitle>

<!-- 
  Esta é a lista de regras.
  Ela não inclui o título nem a caixa cinza, como pedido.
-->
<ul class="lista-regras">
    {#each listaDeRegras as regra}
        <li class="item-regra">
            <span class="numero-carta">{regra.id}</span>
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
        align-items: center; /* Alinha tudo verticalmente */
        gap: 1rem; /* Espaço entre o número, o chip e o texto */
    }

    .numero-carta {
        font-family: 'Rajdhani', sans-serif; /* Assumindo a fonte do projeto */
        font-size: 3cqw; /* Tamanho grande */
        font-weight: 700;
        color: white;
        flex-shrink: 0; /* Não encolhe */
        width: 2.5rem; /* Garante alinhamento (ajuste se precisar) */
        text-align: left;
    }

    .chip-carta {
        flex-shrink: 0; /* Não encolhe */
        width: 1.5rem; /* Tamanho do "chip" escuro */
        height: 1.5rem;
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

</style>