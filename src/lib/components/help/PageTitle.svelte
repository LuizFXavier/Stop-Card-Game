<script lang="ts">
	import type { Snippet } from "svelte";

    let {children}:{children:Snippet} = $props();
</script>

<header>
    <span class="header_span">
        {@render children()}
    </span>
</header>

<style>
header {
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction:row;
  text-align: center;
  justify-content: center;
  align-items: center;
  container-type: inline-size;
  margin-bottom: 2%;
}

.header_span {
  color: white;
  font-size: 6cqw;
  font-family: 'Rajdhani';
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
}
</style>