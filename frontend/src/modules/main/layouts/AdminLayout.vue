<template>
    <!-- ComponentAdmin -->
    <NavAdmin />
    <router-view></router-view>
  </template>
  
  <script>
  import NavAdmin from "../components/NavAdmin.vue";
  
  export default {
    components: {
      NavAdmin,
    },
  };
  </script>
  
  <style></style>
  