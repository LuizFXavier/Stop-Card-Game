<script>
	import { goto } from "$app/navigation";
	import { showError } from "$lib/stores/errorStore";


  let {id, nPlayers} = $props()
  function handleJoin() {
    if(nPlayers >= 4){
      showError("This room is full!");
    }
    else{
      goto(`/room/${id}/lobby`);
    }
  }
</script>

<article class="room-card">
  <header>
    <h2>Room {id}</h2>
  </header>
  
  <section class="info">
    <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
    <span class="players">{nPlayers} / 4</span>
    
  </section>

  <footer>
    <button class="join-btn" onclick={handleJoin}>Join</button>
  </footer>
</article>

<style>
  .room-card {
    background: linear-gradient(145deg, #b8c5ca, #9aa7ac);
    border-radius: 0.75rem;
    padding: 1.25rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 80%;
    margin: auto;
    border: 2px solid #8a979c;
  }

  header {
    text-align: center;
  }

  h2 {
    margin: 0;
    font-size: 2cqw;
    font-weight: 700;
    color: #1a2428;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: Rajdhani;
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: #2a3a3f;
  }

  .icon {
    width: 20%;
    height: 10%;
    stroke: #2a3a3f;
  }

  .players {
    font-weight: 700;
    font-size: 2cqw;
    font-family: Rajdhani;
  }

  footer {
    display: flex;
    justify-content: center;
  }

  .join-btn {
    background: linear-gradient(145deg, #2196f3, #1976d2);
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    padding: 0.625rem 2rem;
    font-family: Rajdhani;
    font-weight: 700;
    font-size: 1.5cqw;
    transition: all 0.2s;
    text-transform: uppercase;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    width: 100%;
  }

  .join-btn:hover {
    background: linear-gradient(145deg, #42a5f5, #2196f3);
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  }

  .join-btn:active {
    transform: translateY(0);
  }
</style>
