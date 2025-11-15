<script lang="ts">
    let {onclick, visible = false} = $props();
    let isVisible = $derived(visible ? "" : "invisible")
</script>

<button class="btn {isVisible}" onclick={onclick}>
    <span class="button_span">
        STOP
    </span>
</button>

<style>
.btn {
  box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  color: white;
  background-color: var(--btn-red);
  font-size: 2cqw;
  font-family: Rajdhani;
  border-radius: 0.8vw;
  align-items: center;
  container-type: inline-size;
  container: btn;
  width: 15%;
  height: 7.5%;
  bottom: 10%;
  right: 17.5%;
  position: absolute;
}
.button_span{
  color: white;
  font-size: 3vw;
  font-family: Rajdhani;
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
}
.invisible{
  display: none;
}
</style>