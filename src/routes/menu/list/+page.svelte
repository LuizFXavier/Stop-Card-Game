<script>
	import RoomCard from "./RoomCard.svelte";
	import Navigation from "./Navigation.svelte";
	import { isHelpModalOpen } from "$lib/stores/helpStore";

  const rooms = [
    { id: 1, name: 'Room ####', nPlayers: 1 },
    { id: 2, name: 'Room ####', nPlayers: 2 },
    { id: 3, name: 'Room ####', nPlayers: 3 },
    { id: 4, name: 'Room ####', nPlayers: 4 },
    { id: 7, name: 'Room ####', nPlayers: 2 }
  ];

</script>



<main class="box gray_rectangle">
  <h1 class="title">
    Created Rooms
  </h1>
  <section class="inner_box box">
    {#each rooms as room (room.id)}
        
        <RoomCard id={room.id} nPlayers={room.nPlayers}/>

    {/each}
    <aside class="scrollbar" aria-hidden="true"></aside>
  </section>
  <Navigation/>
</main>


<style>
.title{
  color: white;
  font-size: 3cqw;
  height: 5%;
  font-family: Rajdhani;
  font-weight: 650;
  word-wrap: break-word;
  text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
}
.box{
  width: 80%;
  height: 90%;
  border-radius: 1vw;
  
  align-items: center;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}
.gray_rectangle {
  top: 5%;
  background: #38474E;
  position: absolute;
  flex-direction: column;
  box-shadow: 0px 1vw 1vw rgba(0, 0, 0, 0.50);
  border: .5vw #B5C1D2 solid;
}
.inner_box{
  box-shadow: 0px 0.2vw 0.2vw rgba(0, 0, 0, 0.50);
  position: relative;
  background: #292D32;
  border: .5vw #B2C2CC solid;
  overflow-y: auto;
  display: grid;
  gap: 1.5rem;
  
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  padding: 1.5rem;
}
</style>