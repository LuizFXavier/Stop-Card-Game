<script lang="ts">

    type Variant = 'default' | 'next' | 'create' | 'confirm' | 'danger';

    interface Props{
        labelR:string;
        variant?: Variant;
        onclickL:()=>void;
        onclickR:()=>void;
    }

    let {labelR, onclickL, onclickR, variant="default"}:Props = $props();
</script>


<footer>
  <button class="btn btn_back" onclick={onclickL}>
      <span class="button_span">
          Back
      </span>
  </button>

  <button class="btn btnR {variant}" onclick={onclickR}>
      <span class="button_span">
          {labelR}
      </span>
  </button>
</footer>

<style>

footer{
  margin-top: auto;
  height: 10%;
  width: 100%;

  align-self: flex-start;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2%;
  
  position: relative;
}
.btn {
  box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  color: white;
  font-size: 2cqw;
  font-family: Rajdhani;
  border-radius: 0.8vw;
  align-items: center;
  container-type: inline-size;
  container: btn;
  width: 40%;
  height: 80%;
}
.btn_back{
  margin-left: 5%;
  background: var(--btn-red);
}
.btnR{
  margin-right: 5%;
}
.next {
  background-color: var(--btn-blue);
}

.create {
  background-color: var(--btn-purple);
}

.confirm {
  background-color: var(--btn-green);
}

.button_span{
  color: white;
  font-size: 2vw;
  font-family: Rajdhani;
  font-weight: 700;
  word-wrap: break-word;
  text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
}
</style>