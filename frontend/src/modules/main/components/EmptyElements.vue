<template>
    <div class="d-flex align-items-center justify-content-center  ">
            <div class="text-center">
                <h2  >No hay {{title}} registrados</h2> 
                <p class="lead">
                    Por favor agregar un nuevo elemento
                </p>  
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
    title: {
        type: String,
        required: true,
    }, 
    });
</script>