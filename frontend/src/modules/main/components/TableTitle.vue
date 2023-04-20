<template>
    <div class="d-flex justify-content-between">
      <h2>{{ title }}:</h2>
      <button
        @click="createAction"
        class="btn btn-outline-dark"
        data-bs-toggle="offcanvas"
        :data-bs-target="`#${id}`"
      >
       <n-icon size="30" style="margin-top: -6px">
                    <AddCircleOutline />
                  </n-icon>
                  <span style="margin-top: 5px; margin-left: 4px">Agregar {{title}}</span>
      </button>
    </div>
  </template>
  
  <script setup>
  import {NIcon} from "naive-ui";
  import { AddCircleOutline } from "@vicons/ionicons5";
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  });
  </script>
  
  <style></style>