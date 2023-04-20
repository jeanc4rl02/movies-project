<template>
  
    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasTypes" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
       <div class="container-form">
          <div class="container body" id="registration-form">
            
            <div >
                 
            </div>
          </div>
       </div>
        
      </div>
    </div>
</template>

<script setup>
     
</script>

<style scoped>
#registration-form .frm{
float:right;
height: 650px;
width: 50%;
min-width: 250px;
padding: 0 35px;
background-size: 100% 100%;
background-color: white;
}
#registration-form h1{
margin-top: 30px;
margin-bottom: 20px;
}
#registration-form .form-control{
width: 90%;
padding: 12px 20px;
height: auto;
}
@media screen and (max-width: 700px){
#registration-form .frm{
    width: 100%;
}
#registration-form .form-control{
    width: 100%;
}
}
@media screen and (max-width: 500px){
#registration-form .frm{
    width: 100%;
}
#registration-form h1{
    text-align: center;
}
#registration-form .btn{
    width: 100%;
    margin-top: 20px;
}
}
</style>