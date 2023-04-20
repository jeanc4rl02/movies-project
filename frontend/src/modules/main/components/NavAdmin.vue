<template >
    <div id="nav"  >
        <nav class="navbar   navbar-expand-lg      z-3  "> 
            <button id="tog" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="logo px-2 py-1 mx-auto">
                <img src="../../../assets/a.png"  style="width:22vh;"   > 
            </div>
             
            
            <div class="collapse navbar-collapse p-0 m-0" id="navbarToggleExternalContent"> 
                <div class="navbar-nav mr-auto"> 
                  <router-link :to="{name: 'admin-cinemas'}" class="nav-item nav-link ">Cinemas</router-link>
                  <router-link :to="{name: 'admin-salas'}" class="nav-link nav-link ">Salas</router-link>
                  <router-link :to="{name: 'admin-peliculas'}" class="nav-link nav-link ">Peliculas</router-link>
                  <router-link :to="{name: 'admin-show'}" class="nav-link nav-link ">Funciones</router-link>
                </div>  
            </div>
            <div class="exit">
                <a  class="nav-item nav-link  "><span class="bi bi-box-arrow-left"></span></a> 
            </div>
        </nav> 

    </div>
</template>


<style scoped>
#nav {
    text-align: center; 
    padding: 0;
    margin: 0; 
}
#nav a {
    font-weight: bold;
    color: #ffffff; 
    height: 10vh;
    width: 12vh; 
    display: flex;
    align-items: center;
    justify-content: center;
}

 .exit{
    font-size: 4vh;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
 }

.navbar{
    background-color: #007bff;
    height: 10vh;
    padding: 0;
    
}
#nav a.router-link-exact-active {
    color: #fff;
    background: #039ae5cf; 
    
}

#nav  a:hover {
    color: #fff;
    background: #039ae56b; 
     
}

@media screen and (max-width: 991px){
     

    .navbar{
        height: 100%;
    }

    #tog{
        margin: 5px;
    }

    #nav a { 
    width: 100%; 
}
}
</style>