<form>
    <div class="form_field">
        <label for ="playerName" >
        Player name
        </label>
        <input id="playerName" type="text"/>
    </div>

    <div class="form_field">
        <label for ="password" >
        Password
        </label>
        <input id="password" type="password"/>
    </div>
</form>

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
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
input{
  width: 50%;
  height: 100%;
  background: #1F2A2C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color:white;
}
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