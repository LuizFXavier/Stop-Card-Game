<script lang="ts">
    import { isHelpModalOpen } from '$lib/stores/helpStore';
    import { fade } from 'svelte/transition'; // Efeito de fade
    
    import NavButton from '../NavButton.svelte';
	import HowToPlay from './HowToPlay.svelte';
	import Rules1 from './Rules1.svelte';
	import Rules2 from './Rules2.svelte';
	import Valuation from './Valuation.svelte';
	import FooterNav from '../FooterNav.svelte';

    // 2. Definir o conteúdo das páginas
    // (Pode preencher com o seu conteúdo de ajuda)
    const helpPages = [
        HowToPlay,
        Rules1,
        Rules2,
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

    // --- Fim da Lógica de Paginação ---


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
<!-- 
  Usamos o atalho '$' para ler o valor da store.
  Se $isHelpModalOpen for 'true', o modal aparece.
  -->
{#if $isHelpModalOpen}  
    <main class="gray_box container">
        <CurrentPage/>
        <FooterNav labelR="Next" variant="next" onclickL={backBehavior} onclickR={nextBehavior}/>
    </main>
{/if}

<style>
.container {
    display: flex;
    flex-direction: column;
    container: container;
}
</style>