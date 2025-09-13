<script lang="ts">
    import "../../app.css"
    let {children} = $props();
</script>

<main class = "faded_background">
    <section class = "gray_box">
        {@render children()}
    </section>
</main>