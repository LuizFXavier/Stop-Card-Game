<script lang="ts">
    let {playerList} = $props()
</script>

<span class="label">Players</span>
<section class="list">

    {#each playerList as p}
        <div class="name">
            {p}
        </div>
    {/each}
</section>


<style>
.list{
    display: flex;
    flex-direction: row;
    gap: 2rem;
}
.name{
    font-family: var(--font);
    color: white;
    font-weight: 600;
    font-size: 2.5cqw;
}
.label{
  color: white;
  font-size: 2.5cqw;
  /* margin-bottom: 1%; */
  font-family: Rajdhani;
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
}
</style>