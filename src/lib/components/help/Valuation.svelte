<script lang="ts">
    import PageTitle from "./PageTitle.svelte";
    // Um array de objetos para guardar os dados da pontuação.
    // Desta forma, é fácil adicionar ou remover regras no futuro.
    const pontuacao = [
        { id: 'K_red', label: 'K', value: '0 pontos', style: 'color: var(--color-red);' },
        { id: 'A', label: 'A', value: '1 ponto' },
        { id: '2_10', label: '2...10', value: 'Valem seu próprio número' },
        { id: 'Q', label: 'Q', value: '11 pontos' },
        { id: 'J', label: 'J', value: '12 pontos' },
        { id: 'K_black', label: 'K', value: '13 pontos' },
        // Para o ícone, definimos 'isIcon: true' e passamos o caminho da imagem
        // Lembre-se de colocar o seu ícone na pasta /static
        { id: 'Coringa', isIcon: true, iconPath: '/icons/joker_ic.png', value: '0 pontos*' } 
    ];
</script>

<PageTitle>
    Valuation
</PageTitle>

<ul class="lista-pontos">
    {#each pontuacao as item (item.id)}
        <li class="item-ponto">
            
            <!-- Coluna 1: A Carta (Label) -->
            <span class="label-carta" style={item.style ?? ''}>
                {#if item.isIcon}
                    <img src={item.iconPath} alt={item.id} class="carta-icone" />
                {:else}
                    {item.label}
                {/if}
            </span>

            <!-- Coluna 2: O Valor (Caixa Escura) -->
            <div class="valor-ponto">
                {item.value}
            </div>

        </li>
    {/each}
</ul>

<style>
    .lista-pontos {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        /* Espaço entre cada linha de regra */
        gap: 0.5rem; 
        width: 80%;
    }

    .item-ponto {
        display: flex;
        align-items: center;
        justify-content: center;
        /* Espaço entre a carta e a caixa de valor */
        gap: 1rem;
    }

    .label-carta {
        /* Esta é a chave: Damos uma largura fixa à coluna da carta.
           "3.5rem" deve ser suficiente para caber "2..10". Ajuste se necessário. */
        width: 3.5rem; 
        flex-shrink: 0; /* Impede que a coluna encolha */

        /* Usamos o truque do flexbox que discutimos para alinhar o conteúdo */
        display: flex;
        justify-content: flex-end; /* Alinha o texto/ícone à direita */
        align-items: center;
        
        /* Estilos de fonte padrão */
        font-family: 'Rajdhani', sans-serif;
        font-size: 2rem; /* Tamanho do texto da carta */
        font-weight: 700;
        color: white; /* Cor padrão (será sobrescrita pelo K vermelho) */
    }

    .carta-icone {
        height: 1.2em;
        width: auto;
        vertical-align: middle;      
        right: 0;
        object-fit: contain;
    }

    .valor-ponto {
        flex: 1; /* Faz a caixa ocupar todo o espaço restante */
        
        /* Estilo da caixa escura (baseado no seu tema) */
        
        background-color: #1F2A2C; 
        border-radius: 1rem; /* Borda bem arredondada como na imagem */
        box-shadow: inset 0 0.125rem 0.25rem rgba(0,0,0,0.5); /* Sombra interna */
        
        /* Estilo do texto interno */
        color: white;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 700;
        font-size: 1.1rem;
        text-align: center;
        padding: 0.75rem 1.5rem;
    }
</style>