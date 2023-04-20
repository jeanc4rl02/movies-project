<template>
    <div class="container-md container-fluid mt-5">
      <TableTitle title="Salas" id="offcanvasTypes" />
      <formCanvas />
  
      <table
        class="table bg-white bg-opacity-75 mt-3 w-100 text-center"
        >
        <!--v-if="references.length!==0"-->
        <thead>
          <tr>
            <th scope="col">campo</th>
            <th scope="col">campo</th>
            <th scope="col">campo</th>
          </tr>
        </thead>
        <tbody>
          <tr  >
            <td>dato </td>
            <td>dato</td>
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
      
    </div>
  </template>
  
  <script setup>
  import TableTitle from "../../main/components/TableTitle.vue";
  import formCanvas from "../../main/components/FormCanvas.vue";
  import {NIcon} from "naive-ui";
  

 
  </script>
  
  <style></style>