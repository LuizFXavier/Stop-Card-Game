<script>
	import { goto } from "$app/navigation";

</script>

<button class="back_button" onclick={()=>{goto("/")}}>
      Back
</button>
<button type="submit" class="next_button">
    Next
</button>

<style>
.back_button {
  width: 40%;
  height: 80%;
  margin-left: 5%;
  background: #EF4637;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: white;
  font-size: 2cqw;
  font-family: Rajdhani;
  border-radius: 14px;
}

.next_button {
  width: 40%;
  height: 80%;
  margin-right: 5%;
  background: #018BF6;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: white;
  border-radius: 14px;
  font-size: 2cqw;
  font-family: Rajdhani;
}
</style>