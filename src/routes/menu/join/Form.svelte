<script lang="ts">
	import FormField from "$lib/components/FormField.svelte";
  
  interface Props{
    roomId:string;
  }
  let {roomId = $bindable("")}:Props = $props();
</script>

<form>
  <FormField bind:bind={roomId} id="roomId" label="Room Code" type = "number"/>

  <FormField id="roomPassword" label="Password" type = "password"/>
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