<script lang="ts">
	import { enhance } from "$app/forms";
  import FormField from "$lib/components/FormField.svelte";
	import type { Fields } from "./fields";
  
  let {fields = $bindable(), callback}:{fields:Fields, callback:()=>void} = $props();
</script>
<form method="POST" id="login" action="?/login" use:enhance={callback}>
    <FormField id="email" name="email" label="Email" type = "email" bind:bind={fields.email}/>

    <FormField id="password" name="password" label="Password" type = "password" bind:bind={fields.password}/>
</form>

<style>

form {
  margin-top: 2%;
  width: 100%;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
}
</style>