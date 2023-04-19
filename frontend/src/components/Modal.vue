<template>
  <div class="modal" v-if="show">
    <div class="modal-container">
      <h2>{{ title }}</h2>
      <div class="modal-content">  
        <div v-if="title === 'Registrarse'">
          <n-space vertical>
            <n-form ref="formInstRef">
              <n-form-item label="Nombre">
                <n-input />
              </n-form-item>
              <n-form-item label="Apellido">
                <n-input />
              </n-form-item>
              <n-form-item label="Correo">
                <n-input />
              </n-form-item>
              <n-form-item label="Contraseña">
                <n-input />
              </n-form-item>
              <n-form-item label="Teléfono">
                <n-input />
              </n-form-item>
            </n-form>
          </n-space>
        </div>
        <div v-if="title === 'Iniciar sesión'">
          <n-space vertical>
            <n-form ref="formInstRef">
              <n-form-item label="Correo">
                <n-input />
              </n-form-item>
              <n-form-item label="Contraseña">
                <n-input />
              </n-form-item>
            </n-form>
          </n-space>
        </div>
      </div>
      <n-space>
      <button class="buttons" @click="toggleModal">Cerrar <n-icon> <CloseCircle/></n-icon></button>
      <button class="buttons" @click="toggleModal">Ingresar <n-icon> <LogIn/></n-icon></button>
      </n-space>
    </div>
  </div>
</template>

<script>
import { CloseCircle, LogIn } from "@vicons/ionicons5";

export default {
  components: { CloseCircle, LogIn},
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      show: true,
      
    };
  },
  methods: {
    toggleModal() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.modal-container {
  background-color: white;
  width: 40%;
  max-width: 800px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.buttons {
  display: flex;
  background-color: #039be5;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-left: 120px;
  height: 30px;
}


</style>
