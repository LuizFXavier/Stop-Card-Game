<script lang="ts">
    let {id, label, type}:
    {id:string, label:string, type:string} = $props();

</script>

<section class="form_field">
        <label for = {id} >
        {label}
        </label>
        <input id={id} type={type}/>
</section>

<style>
.form_field{
  display: flex;
  height: 22%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2%;
}
label{
  color: white;
  font-size: 2cqw;
  margin-bottom: 1%;
  font-family: Rajdhani;
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
}
input{
  width: 50%;
  height: 100%;
  background: #1F2A2C;
  box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.8vw;
  color:white;
}
</style>