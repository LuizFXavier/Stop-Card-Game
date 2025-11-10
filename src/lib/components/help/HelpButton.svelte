<script lang="ts">
    import { isHelpModalOpen } from '$lib/stores/helpStore';

    function openHelp() {
        // Define o estado global como 'true' (aberto)
        isHelpModalOpen.set(true);
    }
</script>

<!-- 
  Usamos 'position: fixed' para que ele fique sempre no canto,
  não importa o conteúdo da página.
-->
<button class="help-btn" onclick={openHelp} aria-label="Abrir ajuda">
    <span>Help</span>
    <!-- Ícone de Livro (Ajuda) -->
    <img 
        src="/icons/book_ic.png" 
        alt="Ícone de ajuda" 
        class="help-icon"
    />
</button>

<style>
    .help-btn {
        position: fixed; /* Flutua sobre a página */
        top: 1.5rem;
        left: 1.5rem;
        z-index: 100; /* Fica acima do conteúdo, mas abaixo do modal */
        
        /* Estilo da imagem */
        background-color: rgba(42, 58, 63, 0.85); /* Fundo escuro com transparência */
        border: 2px solid rgba(255, 255, 255, 0.15); /* Borda subtil */
        border-radius: 0.75rem; /* Bordas arredondadas */
        padding: 0.5rem 0.75rem;
        
        color: white;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 700;
        font-size: 1rem;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .help-btn:hover {
        background-color: rgba(42, 58, 63, 1); /* Fica opaco no hover */
    }
    .help-icon {
        width: 1.75em;  /* Usa 'em' para escalar com o font-size */
        height: 1.75em;
        object-fit: contain; /* Garante que a imagem não distorça */
    }
    span {
        line-height: 1;
    }
</style>