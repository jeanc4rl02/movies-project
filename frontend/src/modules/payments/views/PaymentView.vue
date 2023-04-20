<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-5 col-12">
                <Steps/>
            </div>
            <div class="col-md-7 col-12">
                <RouterView/>
            </div>
        </div>
      
    </div>
 
</template>

<script setup>
    import {RouterView} from 'vue-router'
    import Steps from '../components/Steps.vue'
 
</script>

<style></style>
