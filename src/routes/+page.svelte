<script lang="ts">
	import { PUBLIC_URL } from "$env/static/public";
	import Multiplayer from "../connection/Multiplayer";


    let estado: 'inicio' | 'entrar_sala' = $state('inicio')
    let entrar_salaID:string = $state('')
    let playerName:string = $state('')

    if(!Multiplayer.socket){
        Multiplayer.init(PUBLIC_URL)
    }
    
</script>
<h1>
    Stop!
</h1>

<main>

    {#if estado === 'inicio'}
        <button onclick={()=>{estado = 'entrar_sala'}}>
            Jogar
        </button>
    {:else if estado === 'entrar_sala'}
        <form action="">

            <label>
                Seu nome
                <input type='text' name="playerName" bind:value={playerName}/>
            </label>
            <br>
            <label>
                Código da sala
                <input type='text' bind:value={entrar_salaID}/>
            </label>
            
            <button onclick={()=>{
                localStorage.setItem("playerName", playerName)
                location.href = `/room/${entrar_salaID}`}}>
                ENTRAR
            </button>
            <br>
            <button onclick={()=>{
                    localStorage.setItem("playerName", playerName)
                    location.href = '/room/create'}}>
                Criar nova sala
            </button>
        </form>
        
    {/if}
</main>