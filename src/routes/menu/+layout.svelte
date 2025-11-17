<script lang="ts">
	import HelpButton from "$lib/components/help/HelpButton.svelte";
	import HelpModal from "$lib/components/help/HelpModal.svelte";
    import "../../app.css"
    let {children} = $props();
</script>

<main class = "faded_background">
    <HelpButton/>
    <HelpModal/>
    {@render children()}
</main>