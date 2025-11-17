<script lang="ts">
	import { browser } from "$app/environment";
    import Multiplayer from "../../../connection/Multiplayer";
    import {PUBLIC_URL} from "$env/static/public"
    import io from "socket.io-client"

    let salaID: string = $state('')
    let playerName: string = $state('player')

    let configForm:[string, boolean | null | undefined][] = $state([])
    let numCartas:number = $state(4);

    console.log(PUBLIC_URL)
    if(!Multiplayer.socket){
        Multiplayer.init(PUBLIC_URL)
    }

    function confirmarConfig(){

        let regras:[string, number][] = []

        for(let i = 0; i < configForm.length; i++){
            
            if(configForm[i][1]){
                regras.push([configForm[i][0], 1])
            }
            else{
                regras.push([configForm[i][0], 0])
            }
        }
        regras.push(["numCartas", numCartas])

        Multiplayer.socket!.emit("configSala", salaID, regras)
        location.href = `/room/${salaID}`
    }

    
    configForm.push(["7", true])
    configForm.push(["8", true])
    configForm.push(["9", true])
    configForm.push(["10", true])
    configForm.push(["Q", true])
    configForm.push(["J", true])
        
    

    Multiplayer.socket!.on("salaID", (id:string)=>{
        console.log(id)
        salaID = id
    })
    
    if(browser){
        playerName = localStorage.getItem("playerName") ? localStorage.getItem("playerName")!:'player'
    }
    
    $effect(()=>{
        Multiplayer.socket!.emit("criarSala", playerName)  
    })
</script>

<main>
    <h1>
        Criação da sala {salaID}
    </h1>

    {#each configForm as [regra, valor], id}
        <label class="regra">
            {regra}:
            <input type="checkbox" bind:checked={configForm[id][1]}/>
            <br>
        </label>
    {/each}
        <label class="regra">
            Número de cartas:
            <input type="number" min="1" bind:value={numCartas}>
            
        </label>
    

    {#if salaID}
        <button onclick={()=>{confirmarConfig()}}>
            Confirmar
        </button>
    {/if}
</main>

<style>
    .regra{
        left: 0;
    }
</style>