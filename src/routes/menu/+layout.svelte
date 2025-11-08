<script lang="ts">
    import "../../app.css"
    let {children} = $props();
</script>

<main class = "faded_background">
    
    {@render children()}
</main>