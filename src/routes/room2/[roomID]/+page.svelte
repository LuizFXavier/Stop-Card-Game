<script lang='ts'>
	import type { PageData } from "./$types";

    import type {colocacao} from "$lib/types/colocacao"

    import { browser } from "$app/environment";
    import Game from "./Game.svelte";
    import Multiplayer from "../../../connection/Multiplayer";
    import {PUBLIC_URL} from "$env/static/public"
	import FinalJogo from "./FinalJogo.svelte";
	import Lobby from "./Lobby.svelte";
	import { estadoSala } from "$lib/types/estadoSala";
	import type { regras } from "$lib/types/regras";

    let {data}:{data:PageData} = $props()
    
// States

    let configRegras:Map<string, number> = $state(new Map())

    let playerName: string = $state('player')

    let listaPlayers:Map<number, string> = $state(new Map())

    let isHost: boolean = $state(false)
    
    let roomState:estadoSala = $state(estadoSala.lobby);
    //@ts-ignore
    let salaID:string = $state(data.post.roomID)

    if(!Multiplayer.socket){
        Multiplayer.init(PUBLIC_URL)
    }

// Eventos do cliente
    Multiplayer.socket!.on("entrarSala", (hostName, regras:[string, number][], players:[number, string][])=>{
        configRegras = configRegras.size === 0 ? new Map(regras):configRegras;
        listaPlayers = new Map(players);
        isHost = playerName === hostName ? true:false
    })

    Multiplayer.socket!.on("gameStart", (players:[number, string][], estado:estadoSala)=>{
        listaPlayers = new Map(players);
        roomState = estado;
        console.log("Começou", listaPlayers)
    })

    Multiplayer.socket!.on("encerrarGame", (colc:colocacao) =>{
        roomState = estadoSala.final;
    })
    
    if(browser){
        playerName = localStorage.getItem("playerName") ? localStorage.getItem("playerName")!:'player'
        //@ts-ignore
        Multiplayer.socket!.emit("entrarSala", data.post.roomID, playerName)
    }
</script>

<main>
    {#if !roomState}
        <Lobby {salaID} {listaPlayers} {configRegras} {isHost}/>
    
    {:else}
        <Game  {listaPlayers} {playerName} {salaID} {roomState}/>
    {/if}
</main>

