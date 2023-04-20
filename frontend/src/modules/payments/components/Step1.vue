<template>
    <div class="my-component">

    
    <div >
        <p class="fw-bold">Valor: ${{format(total)}}</p>
        <p class="fw-bold">Precio del Envío: ${{format(shippingPrice)}}</p>
        <div class="form-check form-switch mb-3">
            <label class="form-check-label fw-bold" for="flexSwitchCheckChecked">{{(!couponEnabled)?'Aplicar cupón':'Sin cupón'}}</label>
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" @click="enableCoupon">
        </div>
        <!-- <button class="btn btn-success mb-3" @click="enableCoupon">{{(!couponEnabled)?'Aplicar cupón:':'Sin cupón'}}</button> -->
        <div class="mb-3  w-100  " v-if="couponEnabled">
              <!-- <label for="coupons" class="form-label fw-bold">Aplicar cupón:</label> -->
              <div class="d-flex">
                <input
                  type="text"
                  class="form-control"
                  id="coupons"
                  placeholder="Ingrese su cupón"
                  v-model="coupon">
                <button class="btn btn-dark" @click="applyDiscount">Aplicar</button>
              </div>
              <div  class=" text-danger fw-normal" v-if="!couponOk">El cupón ingresado no es válido.</div>
              <p class="fw-bold mt-2" v-if="discount!==0 && couponOk">Descuento: ${{format(discount)}}</p>
              
        </div>
        
        <p class="fw-bold">Total a Pagar: ${{format(total+shippingPrice-discount)}}</p>
        <button class="btn btn-dark w-100" @click="nextStep">Siguiente</button>
       
    </div>
</div>
</template>

<script setup>
import fetchData from '../../../helpers/fetchData';
import {ref,computed, onMounted } from 'vue';
import {useStepsStore} from '../store/steps.js'
import { useRouter } from 'vue-router';
const router = useRouter();
const useSteps=useStepsStore();
const{prevPinia,nextPinia,stepByNumber}=useSteps;
  
        
 
//Estas son las variables  de la compra
  const total=ref(0);
  const coupon=ref('');
  const discount=ref(0);
  //Variable que almacena 
  const coupons=ref([]);
  //Variable que habilita el formulario del cupón
  const couponEnabled=ref(false);
  const couponOk=ref(true);
  //Propiedades Computadas
  const shippingValue=ref(0);
  const shippingPrice=computed(()=>{
    if(total.value>=50000){
      shippingValue.value=0;
      return 0;
    }else{
        shippingValue.value=5000;
      return 5000;
    }
  });
  

  const format=(value)=>{
    return value.toLocaleString('es-ES',{style:'currency',currency:'COP',maximumFractionDigits: 0})
  }
  const nextStep=()=>{
    const totalToPay=total.value+shippingValue.value-discount.value;
    localStorage.setItem("total",totalToPay);
    nextPinia();
    router.push('/user/payment/step2');
  }
  const applyDiscount=()=>{
    const couponFound=coupons.value.find(el=>el.name===coupon.value.toLocaleLowerCase());
    // console.log(couponFound.dcto);
    if(couponFound){
        discount.value=(couponFound.dcto/100)*total.value;
        couponOk.value=true;
    }else{
        couponOk.value=false;
        discount.value=false;

    }
  
  }
  const enableCoupon=()=>{
    discount.value=0;
    coupon.value='';
    couponEnabled.value=!couponEnabled.value;
    couponOk.value=true;
  }
    onMounted(async()=>{
        stepByNumber(1);
        total.value=Number(localStorage.getItem("total"));
        const {data}=await fetchData('https://food-api-market.onrender.com/api/v1/coupon');
        coupons.value=data;
        console.log(data);
    });
</script>

<style scoped>
    
  .my-component{
    font-family:Arial, Helvetica, sans-serif;
    background-color: white;
    padding: 50px;
    border-radius: 10px;
  }
  .form-check-input:checked {
  background-color: #000;
  border-color: #000;
}
.form-check-input:checked .form-check-label {
  color: #fff;

}
.form-check-input:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.5);
}
.form-check-input:checked+.form-check-label::before {
  background-color: #fff;
}
.form-check-input:checked:focus+.form-check-label::before {
  box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.5);
}
.form-switch .form-check-input:focus {
  border-color: #000;
}
.form-switch .form-check-input:checked {
  border-color: #000;
}
.form-switch .form-check-input:checked+.form-check-label::before {
  background-color: #000;
}
.form-switch .form-check-input:checked:focus+.form-check-label::before {
  box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.5);
}

</style>