<script lang="ts">
	import FormField from "$lib/components/FormField.svelte";

</script>

<form>
  <FormField id="roomId" label="Room Code" type = "text"/>

  <FormField id="roomPassword" label="Password" type = "text"/>
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