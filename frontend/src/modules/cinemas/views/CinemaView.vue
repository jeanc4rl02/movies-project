<template>
    <div class="container-md container-fluid mt-5">
      <TableTitle title="Cinemas" id="offcanvasTypes" />
      
      <table
        class="table bg-white bg-opacity-75 mt-3 w-100 text-center"
        >
        <!--v-if="references.length!==0"-->
        <thead>
            <tr>
                <th scope="col">Logo</th>
                <th scope="col">Nombre</th>
                <th scope="col">Ciudad</th>
                <th scope="col">Dirección</th>
                <th scope="col">Telefono</th>
                <th scope="col">Visualizar</th>
                <th scope="col">Opciones</th>
            </tr>
        </thead>
        <tbody>
            <tr  >
                <td>
                    <img src="../../../assets/img/logo.png" style="width: 6vh;"> 
                </td>
                <td>Cinema Nombre</td>
                <td>Cali</td>
                <td>Calle 12#12-11</td>
                <td>31231123123</td>

                <td>
                <button class="btn btn-sm btn-secondary me-2"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasTypes"
                >
                    <n-icon size="30" style="margin-top: -6px">
                        <Create />
                    </n-icon>
                    <span style="margin-top: 5px; margin-left: 4px">Actualizar</span>
                </button>
                <button class="btn btn-sm btn-danger">
                    <n-icon size="30" style="margin-top: -6px">
                        <TrashSharp />
                    </n-icon>
                    <span style="margin-top: 5px; margin-left: 4px">Borrar</span>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>

    <formCanvas> 
        <cinemaOffCanvas/>
    
    </formCanvas>
    </div>
  </template>
  
<script setup>
    import {NIcon} from "naive-ui";
    import { storeToRefs } from "pinia";
    import { onMounted } from "vue";
    
    //components
    import TableTitle from "../../main/components/TableTitle.vue";
    import formCanvas from "../../main/components/FormCanvas.vue";
    import cinemaOffCanvas from "../components/cinemaofCanvas.vue"
    
    //import store
    import {cinemaOffCanvasStore} from '../store/offcanvas.js';

    //instanciar store
    const useOffCanvas = cinemaOffCanvasStore();
    const {updatedAction} = useOffCanvas;

 
  </script>
  
  <style></style>