<script lang="ts">
    import '../app.css'
    import DummyServer from '$lib/refactor/system/DummyServer';
	import ErrorModal from '$lib/components/ErrorModal.svelte';
    DummyServer.start()
</script>

<ErrorModal/>
<slot />