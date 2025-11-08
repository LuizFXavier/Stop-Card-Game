<script lang="ts">
	import { goto } from "$app/navigation";

</script>


<button class = "btn login_button" onclick={()=>{goto("/user/login")}}>
    <span class="button_span">
    Login
    </span>
</button>

<button class = "btn sign_up_button" onclick={()=>{goto("/user/signup")}}>
    <span class="button_span">
    Sign Up
    </span>
</button>

<button class = "btn anonymous_button" onclick={()=>{goto("/menu/list")}}>
    <span class="button_span">
    Anonymously
    </span>
</button>


<style>
.button_span{
  color: white;
  font-size: 15cqw;
  font-family: Rajdhani;
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
}

.btn{
  box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: calc(1vw + 1vh);
  container-type: inline-size;
  width: 20%;
  height: 10%;
  align-items: center;
}

.login_button {
  margin-top: 15%;
  background: #018BF6;
}

.sign_up_button {
  margin-top: 2%;
  background: #3A9F75;
}

.anonymous_button {
  margin-top: 2%;
  background: #667A78;
}
</style>