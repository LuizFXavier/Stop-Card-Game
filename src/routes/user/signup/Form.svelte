<script lang="ts">
  import FormField from "$lib/components/FormField.svelte";
	import type { Fields } from "./fields";
  import { enhance } from "$app/forms";
  let {fields = $bindable(), callback}:{fields:Fields, callback:()=>void} = $props(); 
</script>

<form method="POST" id="signup" action="?/signup" use:enhance={callback}>
  <FormField id="playerName" name="name" label="Player Name" type = "text" bind:bind={fields.playerName}/>
  
  <FormField id="email" name="email" label="Email" type = "email" bind:bind={fields.email}/>

  <FormField id="password" name="password" label="Password" type = "password" bind:bind={fields.password}/>

  <FormField id="confirmP" name="confirmP" label="Confirm Password" type = "password" bind:bind={fields.confirmP}/>
  
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