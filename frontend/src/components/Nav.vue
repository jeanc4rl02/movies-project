<template>
  <n-nav>
    <n-image src="./src/assets/a.png" alt="Logo de mi sitio web" class="logo" />
    <n-space>
        <n-nav-item>Inicio</n-nav-item>
        <n-nav-item @click="toggleRegisterModal">Registrarse 
          <n-icon>
            <PersonAddSharp />
          </n-icon>
        </n-nav-item>
 
        <n-nav-item @click="toggleLoginModal">Iniciar sesión   
          <n-icon>
            <PersonCircle />
          </n-icon>
        </n-nav-item>
    </n-space>
  </n-nav>

  <Modal title="Registrarse" v-if="showRegisterModal">
   
  </Modal>

  <Modal title="Iniciar sesión" v-if="showLoginModal">
 
  </Modal>
</template>

<script>
import Modal from "./Modal.vue"
import { PersonAddSharp, PersonCircle} from "@vicons/ionicons5";


export default ({
  components: {
    PersonAddSharp, PersonCircle, Modal
  },
  data() {
    return {
      showRegisterModal: false,
      showLoginModal: false,
    };
  },
  methods: {
    toggleRegisterModal() {
      this.showRegisterModal = !this.showRegisterModal;
    },
    toggleLoginModal() {
      this.showLoginModal = !this.showLoginModal;
    },
  },
})
</script>

<style scoped>
n-nav {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  background-color: #039be5;
  padding: 5px;
  text-align: center;
  color: #fff;
  overflow: hidden;
  font-family: "Poppins", sans-serif !important;
  font-weight: 800;
  margin-bottom: 8px;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: auto;
  animation: moveUpDown 4s infinite;
}

n-nav-item:first-child {
  margin-left: 0; /* Elimina el margen del primer elemento */
  margin-right: auto;
  cursor: pointer;
}

n-nav-item:hover{
    color:#000;
}

n-nav-item {
  height: 40px; /* Establece una altura mínima para los elementos */
  display: flex;
  align-items: center; /* Alinea verticalmente el contenido */
  padding: 0 15px; /* Agrega un relleno horizontal */
  margin-left: 10px; /* Agrega un margen entre los elementos */
}



@keyframes moveUpDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(0);
  }
}

</style>
