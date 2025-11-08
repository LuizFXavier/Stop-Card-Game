<script>
  import RoomCard from './RoomCard.svelte';

  const rooms = [
    { id: 1, name: 'Room ####', players: '1/4' },
    { id: 2, name: 'Room ####', players: '3/4' },
    { id: 3, name: 'Room ####', players: '3/4' },
    { id: 4, name: 'Room ####', players: '4/4' }
  ];

  function handleBack() {
    console.log('Back clicked');
  }

  function handleCreateRoom() {
    console.log('Create Room clicked');
  }

  function handleJoinPrivate() {
    console.log('Join Private clicked');
  }
</script>

<main>

</main>

<article class="container">
  <header>
    <button class="help-btn" aria-label="Help">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <circle cx="12" cy="17" r="0.5" fill="currentColor"/>
      </svg>
      <span>Help</span>
    </button>
    <h1>Created Rooms</h1>
  </header>

  <section class="rooms-grid">
    <ul class="rooms-list">
      {#each rooms as room (room.id)}
        <li>
          <RoomCard {...room} />
        </li>
      {/each}
    </ul>
    <aside class="scrollbar" aria-hidden="true"></aside>
  </section>

  <footer class="actions">
    <button class="btn btn-back" on:click={handleBack}>Back</button>
    <button class="btn btn-create" on:click={handleCreateRoom}>Create Room</button>
    <button class="btn btn-join" on:click={handleJoinPrivate}>Join Private</button>
  </footer>
</article>

<style>
  .container {
    background: linear-gradient(145deg, #3d4f54, #2a3a3f);
    border-radius: 1.5rem;
    padding: 2rem;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    border: 3px solid #4a5c62;
  }

  header {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .help-btn {
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    border: 2px solid #5a6c72;
    border-radius: 0.5rem;
    color: #fff;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    font-family: 'Orbitron', monospace;
    transition: all 0.2s;
  }

  .help-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #7a8c92;
  }

  .help-btn svg {
    width: 20px;
    height: 20px;
  }

  h1 {
    text-align: center;
    color: #fff;
    font-size: 2rem;
    font-weight: 900;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .rooms-grid {
    background: linear-gradient(145deg, #4a5c62, #3a4a4f);
    border: 3px solid #2a3a3f;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    gap: 1rem;
    min-height: 300px;
  }

  .rooms-list {
    flex: 1;
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    align-content: start;
  }

  .scrollbar {
    width: 12px;
    background: #2a3a3f;
    border-radius: 6px;
    position: relative;
  }

  .scrollbar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 60%;
    background: #fff;
    border-radius: 4px;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn {
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 0.5rem;
    font-family: 'Orbitron', monospace;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  .btn:active {
    transform: translateY(0);
  }

  .btn-back {
    background: linear-gradient(145deg, #ef5350, #d32f2f);
    color: #fff;
  }

  .btn-create {
    background: linear-gradient(145deg, #ab47bc, #8e24aa);
    color: #fff;
  }

  .btn-join {
    background: linear-gradient(145deg, #66bb6a, #43a047);
    color: #fff;
  }

  @media (max-width: 600px) {
    .container {
      padding: 1.5rem;
    }

    h1 {
      font-size: 1.5rem;
    }

    .rooms-list {
      grid-template-columns: 1fr;
    }

    .actions {
      flex-direction: column;
    }

    .btn {
      width: 100%;
    }
  }
</style>
