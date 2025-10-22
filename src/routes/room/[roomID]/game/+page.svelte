<script lang="ts">
    import game from "$lib/refactor/Game";
    import Mouse from "$lib/refactor/system/Mouse";

    $effect(()=>{
        game.start("gameScreen");
    });

</script>

<canvas
    id="gameScreen" 
    onclick={(e)=>{ Mouse.clicked = e.button == 0}}

    onmousemove={(e)=>{
        Mouse.x = e.clientX;
        Mouse.y = e.clientY;
    }}>

</canvas>

<style>
    canvas{
        width: 100%;
        height: 100%;
        position:absolute;
        top:0;
        left:0;
    }
</style>