<!-- <div class="sign-up">
  <div class="box"></div>
  <div class="options"><span class="options_span">Sign Up</span></div>
  <div data-property-1="Default" class="back">
    <div class="button"></div>
    <div class="options_01"><span class="options_01_span">Next</span></div>
  </div>
  <div data-property-1="Default" class="back_01">
    <div class="button_01"></div>
    <div class="options_02"><span class="options_02_span">Back</span></div>
  </div>
  <div class="button_02"></div>
  <div class="placeholder"><span class="placeholder_span">12345</span></div>
  <div class="nome-da-label"><span class="nomedalabel_span">Password</span></div>
  <div class="button_03"></div>
  <div class="placeholder_01"><span class="placeholder_01_span">Flamengo</span></div>
  <div class="options_03"><span class="options_03_span">Player Name</span></div>
  <div class="button_04"></div>
  <div class="placeholder_02"><span class="placeholder_02_span">12345</span></div>
  <div class="nome-da-label_01"><span class="nomedalabel_01_span">Confirm Password</span></div>
</div> -->

<script lang="ts">
  import Form from "./Form.svelte";
</script>

<main>
  <header>
    <span class = "header_span">
      Sign Up
    </span>
  </header>
  <Form/>

  <footer>
    <button class="back_button">
      Back
    </button>
    <button type="submit" class="next_button">
      Next
    </button>
  </footer>
</main>

<style>

footer{
  height: 10%;

  flex: 1;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5%;
  /* position: relative; */
}

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

header {
  text-align: center;
  
  display: flex;
  flex-direction:row;
  text-align: center;
  justify-content: center;
  align-items: center;
  container-type: inline-size;
}

.header_span {
  color: white;
  font-size: 10cqw;
  font-family: Rajdhani;
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.button {
  width: 307px;
  height: 71px;
  left: 0px;
  top: 0px;
  position: absolute;
  background: #018BF6;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
}

.options_01_span {
  color: white;
  font-size: 40px;
  font-family: Rajdhani;
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.options_01 {
  left: 118.18px;
  top: 10.36px;
  position: absolute;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.options_02_span {
  color: white;
  font-size: 40px;
  font-family: Rajdhani;
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.options_02 {
  left: 117.18px;
  top: 10.36px;
  position: absolute;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.button_02 {
  width: 764px;
  height: 87px;
  left: 79px;
  top: 508px;
  position: absolute;
  background: #1F2A2C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
}

.placeholder_span {
  color: #B5C1D2;
  font-size: 48px;
  font-family: Rajdhani;
  font-weight: 600;
  word-wrap: break-word;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.placeholder {
  width: 764px;
  height: 87px;
  left: 79px;
  top: 508px;
  position: absolute;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.nomedalabel_span {
  color: white;
  font-size: 48px;
  font-family: Rajdhani;
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.nome-da-label {
  left: 373px;
  top: 412px;
  position: absolute;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.placeholder_01_span {
  color: #B5C1D2;
  font-size: 48px;
  font-family: Rajdhani;
  font-weight: 600;
  word-wrap: break-word;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.placeholder_01 {
  width: 764px;
  height: 87px;
  left: 79px;
  top: 277px;
  position: absolute;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.options_03_span {
  color: white;
  font-size: 48px;
  font-family: Rajdhani;
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.options_03 {
  left: 348px;
  top: 196px;
  position: absolute;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.button_04 {
  width: 764px;
  height: 87px;
  left: 79px;
  top: 723px;
  position: absolute;
  background: #1F2A2C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
}

.placeholder_02_span {
  color: #B5C1D2;
  font-size: 48px;
  font-family: Rajdhani;
  font-weight: 600;
  word-wrap: break-word;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.placeholder_02 {
  width: 764px;
  height: 87px;
  left: 79px;
  top: 723px;
  position: absolute;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.nomedalabel_01_span {
  color: white;
  font-size: 48px;
  font-family: Rajdhani;
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.nome-da-label_01 {
  left: 298px;
  top: 627px;
  position: absolute;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.back {
  width: 307px;
  height: 71px;
  left: 534px;
  top: 888px;
  position: absolute;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50);
}

.back_01 {
  width: 307px;
  height: 71px;
  left: 78px;
  top: 888px;
  position: absolute;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50);
}

.sign-up {
  width: 919px;
  height: 1000px;
  position: relative;
}
</style>