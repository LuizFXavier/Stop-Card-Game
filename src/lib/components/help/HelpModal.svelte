<script lang="ts">
    import { isHelpModalOpen } from '$lib/stores/helpStore';
    
	import HowToPlay from './HowToPlay.svelte';
	import Rules1 from './Rules1.svelte';
	import Rules2 from './Rules2.svelte';
	import Valuation from './Valuation.svelte';
	import FooterNav from '../FooterNav.svelte';
	import Rules3 from './Rules3.svelte';

    // 2. Definir o conteúdo das páginas
    // (Pode preencher com o seu conteúdo de ajuda)
    const helpPages = [
        HowToPlay,
        Rules1,
        Rules2,
        Rules3,
        Valuation
    ];

    // 3. Criar estado local para a página atual
    let currentPage = $state(0);
    const totalPages = helpPages.length;

    let backBehavior = $derived(currentPage == 0 ? closeHelp : prevPage);
    let nextBehavior = $derived(currentPage == helpPages.length -1 ? closeHelp : nextPage);
    let CurrentPage = $derived(helpPages[currentPage])

    function nextPage() {
        if (currentPage < totalPages - 1) {
            currentPage++;
        }
    }

    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
        }
    }


    function closeHelp() {
        // Define o estado global como 'false' (fechado)
        isHelpModalOpen.set(false);
    }
    
    // Função para tratar o keydown (fechar com 'Escape')
    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            closeHelp();
        }
    }

    // Resetar para a página 1 sempre que o modal abrir
    $effect(() => {
        if ($isHelpModalOpen) {
            currentPage = 0;
        }
    });

</script>

<svelte:window on:keydown={handleKeydown} />

{#if $isHelpModalOpen}
    <button
        type="button"
        class="overlay"
        onclick={closeHelp}
        aria-label="Fechar modal de ajuda"
    ></button>
    <main class="gray_box container">
        <section class="content">

            <CurrentPage/>
        </section>

        <div class="pagination-dots">
            {#each { length: totalPages } as _, i}
                
                <span class="dot" class:active={i === currentPage}></span>
            {/each}
        </div>
        <FooterNav labelR="Next" variant="next" onclickL={backBehavior} onclickR={nextBehavior}/>
    </main>
{/if}

<style>
.overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        cursor: default;
        
        backdrop-filter: blur(2px); 
        
        z-index: 1000;
        
        border: none;
        padding: 0;
    }
.container {
    display: flex;
    flex-direction: column;
    container: container;
    z-index: 1001; 
}

.content{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    /* justify-content: center; */
}

.pagination-dots {
    display: flex;
    gap: 0.5rem; /* Espaço entre os pontos */
    margin-bottom: 2%;
}

.dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #1F2A2C; 
    transition: background-color 0.2s;
    cursor: default;
    border: none;
    align-self: flex-start;
}

.dot.active {
    background-color: white; 
}
</style>