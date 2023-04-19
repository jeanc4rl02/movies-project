<template>
  <n-nav>
    <n-image src="./src/assets/a.png" alt="Logo de mi sitio web" class="logo" />
    <n-space>
    <n-nav-item to="/">Inicio</n-nav-item>
    <n-nav-item to="/acerca-de">Registrarse</n-nav-item>
    <n-nav-item to="/contacto">Iniciar sesión</n-nav-item>
    </n-space>
  </n-nav>
</template>

<style scoped>
n-nav {
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  background-color: #039be5;
  padding: 10px;
  text-align: center;
  color: #fff;
  font-family: "Poppins", sans-serif !important;
  overflow: hidden;
  font-family: "Poppins", sans-serif !important;
  font-weight: 800;
  border-radius:8px ;
}

.logo {
  width: 50px;
  height: 50px;
  margin-right: auto;
  border-radius: 8px;
}

n-nav-item:first-child {
  margin-right: auto;
  margin-top: 9px;
}


</style>
