<template>
  <RouterView  />
   
</template>

<script>
  import Nav from './components/Nav.vue';

  export default {
    components: {
      Nav,
    },
  };
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
