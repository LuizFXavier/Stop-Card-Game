<script lang="ts">
	import { goto } from "$app/navigation";
	import FooterNav from "$lib/components/FooterNav.svelte";
	import PageTitle from "$lib/components/PageTitle.svelte";
	
  import Form from "./Form.svelte";


	function handleNext(): void {
		throw new Error("Function not implemented.");
	}
</script>

<main>
  <PageTitle>
    Sign Up
  </PageTitle>

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

</style>