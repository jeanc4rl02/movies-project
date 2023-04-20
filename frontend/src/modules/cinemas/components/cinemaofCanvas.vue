<template>
    <div >
        <h2 class="mb-5 text-center">Agregar Cinema</h2>
        <form @submit.prevent="processForm">
            <div class="form-group mb-2">
                <label for="image" class="mb-2">Seleccionar Logo:</label>
                <input type="file" name="image" class="form-control w-100" id="image" @change="onFileSelected" >
            </div>
            <div class="form-group mb-2">
                <label for="name " >Nombre:</label>
                <input type="text" class="form-control mt-2" id="name" placeholder="Ingrese el nombre" v-model="name"> 
            </div>
            <div class="form-group mb-2">
                <label for="name " >Ciudad:</label>
                <input type="text" class="form-control mt-2" id="city" placeholder="Ingrese la Ciudad" v-model="city"> 
            </div>
            <div class="form-group mb-2">
                <label for="name " >Dirección:</label>
                <input type="text" class="form-control mt-2" id="address" placeholder="Ingrese la Dirección" v-model="address"> 
            </div>
            <div class="form-group mb-2">
                <label for="name " >Teléfono:</label>
                <input type="text" class="form-control mt-2" id="phone" placeholder="Ingrese el Teléfono" v-model="phone"> 
            </div> 
            <div class="form-group mb-2 mt-5">
                <button type="submit" class="btn btn-outline-secondary btn-lg w-100" data-bs-dismiss="offcanvas"
                    aria-label="Close" >Guardar</button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import {ref,watch} from 'vue'

    //variables reactivas
    const name= ref('');
    const city= ref('');
    const address= ref('');
    const phone= ref('');
    const logo= ref('');
</script>

<style>

</style>