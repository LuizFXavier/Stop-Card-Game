<script>
	import { goto } from "$app/navigation";
	import NavButton from "$lib/components/NavButton.svelte";
	import PageTitle from "$lib/components/PageTitle.svelte";

</script>

<main>

    <PageTitle>
        Confirm your email
    </PageTitle>
    
    <p class="text">
        Check the inbox of the provided email to confirm your account.
    </p>
    
    <NavButton variant="danger" onclick={()=>{goto('/')}}>
        Back
    </NavButton>
</main>

<style>
main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
}
.text{
    color: white;
    font-family: var(--font);
    width: 90%;
    text-align:center;
    font-size: 3cqw;
    font-weight: 600;
}

</style>