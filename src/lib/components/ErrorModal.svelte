<script lang="ts">
	import { isErrorOpen, errorMessage } from "$lib/stores/errorStore";
	import type { Snippet } from "svelte";
	import PageTitle from "./PageTitle.svelte";
	import NavButton from "./NavButton.svelte";

    function closeError() {
        isErrorOpen.set(false);
    }

    // Função para fechar com a tecla "Escape"
    function handleKeydown(e: KeyboardEvent) {
        // Só fecha se o modal estiver aberto (para não correr sempre)
        if ($isErrorOpen && e.key === 'Escape') {
            closeError();
        }
    }
</script>

{#if $isErrorOpen}

    <!-- 1. O FUNDO APAGADO (OVERLAY) -->
    <!-- Este botão é o seu "fundo apagado". Ele cobre tudo. -->
    <button
        type="button"
        class="overlay"
        onclick={closeError}
        aria-label="Fechar modal de erro"
    ></button>

    <main class="outer_box box">
        <section class="inner_box box">
            <PageTitle>
                Error
            </PageTitle>
            <p class="message">
                {$errorMessage}
            </p>
        </section>
        <NavButton variant="danger" onclick={closeError}>
            Back
        </NavButton>
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

.box{
  border-radius: 1vw;
    z-index: 1001;
  align-items: center;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}
.outer_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 50%;
  background: #38474E;
  flex-direction: column;
  box-shadow: 0px 1vw 1vw rgba(0, 0, 0, 0.50);
  border: .5vw #B5C1D2 solid;
}
.inner_box{
  width: 90%;
  height: 80%;
  box-shadow: 0px 0.2vw 0.2vw rgba(0, 0, 0, 0.50);
  position: relative;
  background: #292D32;
  border: .5vw #B2C2CC solid;
  overflow-y: auto;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1%;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  padding: 1.5rem;
}

.message{
    color: white;
    font-family: var(--font);
    width: 90%;
    text-align:center;
    font-size: 1.5cqw;
    font-weight: 600;
}
</style>