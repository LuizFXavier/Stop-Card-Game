<script lang="ts">
    let {onclick, visible = false} = $props();
    let isVisible = $derived(visible ? "" : "invisible");
</script>

<button class="btn {isVisible}" aria-label="Descarte" onclick={onclick}>
    <img src="/icons/trash_ic.png" alt=""/>
</button>

<style>
.btn {
  /* box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25); */
  color: white;
  /* background-color: var(--btn-red); */
  font-size: 2cqw;
  font-family: Rajdhani;
  border-radius: 0.8vw;
  align-items: center;
  container-type: inline-size;
  container: btn;
  width: 10%;
  height: auto;
  bottom: 5%;
  left: 7%;
  position: absolute;
}

.invisible{
  display: none;
}

</style>