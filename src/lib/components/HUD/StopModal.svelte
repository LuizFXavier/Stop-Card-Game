
<button
    type="button"
    class="overlay"
    aria-label="Fechar modal de stop"
></button>
<main class="gray_box container">
    
</main>


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