<template>
  <div>
    <button class="btn btn-dark w-75" @click="startPayment">Ir al Pago Electrónico</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStepsStore } from "../store/steps.js";
const useSteps = useStepsStore();
const { prevPinia, nextPinia } = useSteps;

const router = useRouter();
const startPayment = () => {
  router.push("/payment/step1");
  nextPinia();
};
</script>

<style></style>
