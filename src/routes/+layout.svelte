<script lang="ts">
    import '../app.css'
    import DummyServer from '$lib/refactor/system/DummyServer';
    DummyServer.start()
</script>

<slot />