<script>
	import { goto } from "$app/navigation";

</script>

<main class="container">
    <button class="btn back_button" onclick={()=>{goto("/")}}>
        <span class="button_span">
            Back
        </span>
    </button>

    <button class="btn create_button" onclick={()=>{goto("/")}}>
        <span class="button_span">
            Create Room
        </span>
    </button>

    <button type="submit" class="btn join_button" onclick={()=>{goto("/room/2/game")}}>
        <span class="button_span">
            Join Private
        </span>
    </button>
</main>

<style>
.container{
    height: 20%;
    width: 75%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.btn{
  box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1vw;
  container-type: inline-size;
  width: 20%;
  height: 45%;
  container: btn;
  align-items: center;
}

.back_button {
  background: #EF4637;
}

.create_button {
  background: #9E74CE;
}

.join_button {
  background: #36AF80;
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