<script lang="ts">
	import type { Snippet } from "svelte";

    interface Props{
        children: Snippet;
        color:string;
        onclick:()=>void;
    }

    let {children, color, onclick = ()=>{}}:Props = $props();
</script>

<button class="btn" style="background: {color};" onclick={onclick}>
    <span class="button_span">
        {@render children()}
    </span>
</button>

<style>
.btn {
  box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  color: white;
  font-size: 2cqw;
  font-family: Rajdhani;
  border-radius: 0.8vw;
  align-items: center;
  container-type: inline-size;
  container: btn;
  width: 40%;
  height: 80%;
}
.button_span{
  color: white;
  font-size: 2vw;
  font-family: Rajdhani;
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
}
</style>