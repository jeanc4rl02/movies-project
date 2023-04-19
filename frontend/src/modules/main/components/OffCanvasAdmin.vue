<template>
    <div
      class="offcanvas offcanvas-start bg-dark z-2 show"
      data-bs-scroll="true"
      data-bs-backdrop="false"
      tabindex="-1"
      id="offcanvasScrolling"
      aria-labelledby="offcanvasScrollingLabel"
    >
      <div class="offcanvas-header mt-5 text-center">
        <div class="box-logo"> 
          <img class="logo mx-auto" src="../assets/img/logo.png" alt="Logo" />
          <h5 class="offcanvas-title text-white mt-4 mx-auto" id="offcanvasScrollingLabel">
            Administracion
          </h5>
        </div>
  
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body text-white text-center open-sans-bold">
        <router-link
          class="btn d-flex justify-content-start align-items-center"
          :to="{ name: 'home' }"
        >
          <span class="material-symbols-outlined"> home</span>Inicio</router-link
        >
      
      </div>
    </div>
  </template>
  
  <script></script>
  
  <style scoped>
  a {
    text-align: center;
    text-decoration: none;
    color: #fff;
    font-size: 1.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    width: 100%;
    margin-bottom: 0.5rem;
    /* border-bottom: 1px solid #fff; */
    transition: 0.3s ease-in-out;
  }
  
  a > span {
    text-align: center;
    font-size: 1.5rem;
    margin: 0 0.5rem;
  }
  
  a:hover {
    width: 100%;
    transform: scale(1.1);
    color: #fff;
    background: var(--color-4);
  }
  
  .router-link-exact-active,
  .router-link-exact-active:hover {
    width: 100%;
    transform: scale(1.1);
    color: #fff;
    background: var(--color-3);
  }
  
  .box-logo {
    width: 100%;
    padding: 1rem 0.5rem;
    border-radius: 0.5rem;
    z-index: 2;
    overflow: hidden;
  }
  
  .logo {
    width: 6rem;
  }
  </style>
  