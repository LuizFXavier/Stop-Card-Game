<script lang="ts">
	import type { Snippet } from "svelte";

  
    type Variant = 'default' | 'next' | 'create' | 'confirm' | 'danger';

    interface Props{
        children: Snippet;
        variant?: Variant;
        onclick:()=>void;
    }

    let {children, variant, onclick = ()=>{}}:Props = $props();
</script>

<button class="btn {variant}" onclick={onclick}>
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

.next {
  background-color: var(--btn-blue);
}

.danger {
  background-color: var(--btn-red);
}

.create {
  background-color: var(--btn-purple);
}

.confirm {
  background-color: var(--btn-green);
}
</style>