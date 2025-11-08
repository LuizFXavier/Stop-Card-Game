<script lang="ts">
	import { goto } from "$app/navigation";
	import FooterNav from "$lib/components/FooterNav.svelte";
  import Form from "./Form.svelte";

	function handleNext(): void {
		throw new Error("Function not implemented.");
	}
</script>

<main>
  <header>
    <span class = "header_span">
      Login
    </span>
  </header>
  <Form/>

  <FooterNav labelR="Next" variant="next" onclickR={handleNext} onclickL={()=>{goto("/")}}/>
  
</main>

<style>

main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
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