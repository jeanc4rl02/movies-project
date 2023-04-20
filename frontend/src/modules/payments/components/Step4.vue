<template>
  <div class="my-component">
    
    <h2>Gracias por su compra...</h2>
    <div class="d-flex">
      <img src="../../../assets/img/B-2.png" alt="" class="w-25 ">
      <p class="font p-2 fw-bold">
        Nuestros envíos pueden demorar entre 5 y 30 min dependiendo de la distancia hacia
        el sitio de entrega. Si pasados 30 minutos aún no cuenta con su pedido, el domicilio
        es completamente gratis.
      </p>
    </div>
    <button class="btn btn-dark w-100 mt-4" @click="finish">Terminar</button>
   
    
  </div>
  
</template>

<script setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import {useStepsStore} from '../store/steps.js'
  const useSteps=useStepsStore();
  const{prevPinia,nextPinia,stepByNumber}=useSteps;

  const router = useRouter();
  const finish=()=>{
    router.push('/')
    nextPinia();
    
  }

  onMounted(()=>{
      stepByNumber(4);
  })

</script>

<style scoped>
  .font{
    font-weight: 300 !important;
    font-size: small !important;
   
  }
  
  .my-component{
    font-family:Arial, Helvetica, sans-serif;
    background-color: white;
    padding: 50px;
    border-radius: 10px;
  }
</style>