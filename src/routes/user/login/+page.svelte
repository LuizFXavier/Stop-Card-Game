<script lang="ts">
	import Navigation from "../Navigation.svelte";
  import Form from "./Form.svelte";
</script>

<main>
  <header>
    <span class = "header_span">
      Login
    </span>
  </header>
  <Form/>

  <footer>
    <Navigation/>
  </footer>
  
</main>

<style>

main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

footer{
  margin-top: auto;
  height: 10%;
  width: 100%;

  align-self: flex-start;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2%;
  
  position: relative;
}

header {
  text-align: center;
  
  display: flex;
  flex-direction:row;
  text-align: center;
  justify-content: center;
  align-items: center;
  container-type: inline-size;

}

.header_span {
  color: white;
  font-size: 10cqw;
  font-family: 'Rajdhani';
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
}

</style>