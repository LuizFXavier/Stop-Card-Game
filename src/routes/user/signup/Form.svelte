<script lang="ts">
  import FormField from "$lib/components/FormField.svelte";
</script>

<form>
  <FormField id="playerName" label="Player Name" type = "text"/>
  
  <FormField id="email" label="E-mail" type = "email"/>

  <FormField id="password" label="Password" type = "password"/>

  <FormField id="confirmP" label="Confirm Password" type = "password"/>
  
</form>

<style>

form {
  margin-top: 2%;
  width: 100%;
  /* height: 75%; */
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
}
</style>