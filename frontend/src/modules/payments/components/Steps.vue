<template>
    <n-space vertical>
      <n-steps vertical :current="(current )" :status="currentStatus">
        <n-step
          title="Total de la Compra:"
          description="Observe su total de compra e introduzca un cupón de descuento si lo tiene."
        />
        <n-step
          title="Forma de Pago:"
          description="Llene los datos para el pago electrónico."
        />
        <n-step
          title="Datos de envío:"
          description="Díganos a donde quiere que llevemos su pedido."
        />
        
        <n-step
          title="Agradecimientos por la compra:"
          description="Su pedido va en camino..."
        />
     
      </n-steps>
      <n-space>
        <!-- <n-button-group>
          <n-button @click="prev">
            <template #icon>
              <n-icon>
                <md-arrow-round-back />
              </n-icon>
            </template>
          </n-button>
          <n-button @click="next">
            <template #icon>
              <n-icon>
                <md-arrow-round-forward />
              </n-icon>
            </template>
          </n-button>
        </n-button-group> -->
        <!-- <n-radio-group
          v-model:value="currentStatus"
          size="medium"
          name="vertical"
        >
          <n-radio-button value="error">
            Error
          </n-radio-button>
          <n-radio-button value="process">
            Process
          </n-radio-button>
          <n-radio-button value="wait">
            Wait
          </n-radio-button>
          <n-radio-button value="finish">
            Finish
          </n-radio-button>
        </n-radio-group> -->
        
      </n-space>
    </n-space>
  </template>
  
  <script>
  import { defineComponent, ref } from "vue";
  import { MdArrowRoundBack, MdArrowRoundForward } from "@vicons/ionicons4";
  import {useStepsStore} from '../store/steps.js';
  import {storeToRefs} from 'pinia';
  
  export default defineComponent({
    components: {
      MdArrowRoundBack,
      MdArrowRoundForward
    },
    setup() {
      const useSteps= useStepsStore();
      const {currentRefPinia}=storeToRefs(useSteps);
      const currentRef = ref(1);
      return {
        currentStatus: ref("process"),
        current: currentRefPinia, //Aquí debo asignar directamente la variable reactiva de pinia

        //Al final lo que tienes que hacer en el store de pinia es afectar el currentRef.
        //Pasos: 1. El current 
        next() {
          if (currentRef.value === null)
            currentRef.value = 1;
          else if (currentRef.value >= 4)
            currentRef.value = null;
          else
            currentRef.value++;
        },
        prev() {
          if (currentRef.value === 0)
            currentRef.value = null;
          else if (currentRef.value === null)
            currentRef.value = 4;
          else
            currentRef.value--;
        }
      };
    }
  });
  </script>