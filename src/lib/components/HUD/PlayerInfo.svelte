<script lang="ts">
    type Variant = "bottom" | "right" | "top" | "left";

    interface Props{
        name:string;
        variant:Variant;
        shiny?:boolean;
    }
    let {name, variant, shiny=false}:Props = $props();

    let outlined = $derived(shiny ? "outlined" : "");
</script>

<section class="outer_box {outlined} {variant}">
  <span class="name_span">
    {name}
  </span>
  <div class="inner_box">
    <span class="name_span">
      0
    </span>
  </div>
</section>

<style>
.outer_box{
    background-color: #C0C8D6;
    border-radius: 1vw;
    width: 10%;
    height: 15%;
    align-items: center;
    align-content: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    position: absolute;
    box-shadow: 0px 0.2rem 0.2rem rgba(0, 0, 0, 0.25);
}

.inner_box{
  background-color: var(--btn-red);
  border-radius: 1vw;
  width: 70%;
  height: 50%;
  justify-content: center;
  align-content: center;
  text-align: center;
  position: relative;
  box-shadow: 0px 0.2rem 0.2rem rgba(0, 0, 0, 0.25);
}
.name_span{
  font-weight: 600;
  font-size: 2.5cqw;
  text-align: center;
  font-family: var(--font);
  color: white;
  text-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);

  white-space: nowrap;

  /* 2. Esconde qualquer parte do texto que "vaze" da caixa */
  overflow: hidden;

  /* 3. Adiciona o "..." no final do texto cortado */
  text-overflow: ellipsis;
  width: 80%;
}
.outlined{
    border: 1rem;
    border-color: white;
    box-shadow: 0 0 1rem 0.25rem white;
}
 .left {
  top: 10vh;  
  left: 10vw;
}


.top {
  top: 5vh;
  left: 68vw;
}

 .bottom {
  bottom: 5vh;
  left: 25vw;
}

.right {
  top: 10vh; 
  right: 5vw;
}  

</style>
