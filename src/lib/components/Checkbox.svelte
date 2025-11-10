<script lang="ts">
    let { children, sp = false, checked = $bindable(false), ...rest } = $props();
</script>

<label class="custom-checkbox">
    <span class="label-content">
        {@render children()}
    </span>
    <input type="checkbox" bind:checked {...rest} />
    <span class="checkmark"></span>
</label>

<style>
    .custom-checkbox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        user-select: none;
        gap: 0.75rem; /* Espaço responsivo */
        
        font-family: 'Rajdhani', sans-serif;
        font-weight: 700;
        color: white;
        font-size: 2rem; /* Texto um pouco maior também (aprox. 24px) */
        width: 80%;
    }

    .custom-checkbox input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .checkmark {
        position: relative;
        height: 2.1rem;  /* Aprox. 32px (bem maior agora) */
        width: 2.1rem;
        background-color: #1F2A2C;
        border-radius: 30%;
        box-shadow: inset 0 0.125rem 0.25rem rgba(0,0,0,0.5); /* Sombras em rem */
        transition: all 0.2s ease-in-out;
        flex-shrink: 0; /* Garante que a bolinha não amassa se o texto for longo */
        /* ADICIONADO: Borda transparente por padrão para reservar espaço */
        border: 0.125rem solid var(--color-bg);
        /* Garante que a borda não aumenta o tamanho total de 2rem */
        box-sizing: border-box;
    }

    .custom-checkbox:hover input ~ .checkmark {
        background-color: #2a3a3f;
    }

    .custom-checkbox input:checked ~ .checkmark {
        background-color: #018BF6;
        box-shadow: none;
        border-color: white;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
        
        /* Técnica de centralização perfeita */
        left: 50%;
        top: 50%;
        
        /* Tamanho do visto relativo ao tamanho da bolinha */
        width: 0.5rem;
        height: 1rem;
        
        border: solid white;
        /* Espessura do visto também em rem */
        border-width: 0 0.25rem 0.25rem 0;
        
        /* O translate(-50%, -60%) centraliza e sobe um pouquinho 
           para compensar visualmente o formato do check */
        transform: translate(-50%, -60%) rotate(45deg);
    }

    .custom-checkbox input:checked ~ .checkmark:after {
        display: block;
        
    }
    .label-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
</style>