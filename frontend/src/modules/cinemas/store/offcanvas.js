import {defineStore} from 'pinia';

export  const  cinemaOffCanvasStore=defineStore('offcanvas',{
    state:()=>({
        create:true,
        id:null,
        name:'',
        address:'',
        city:'',
        phone:'',
        logo:'',
        
    }),
    actions:{
        updateAction(id,name , address, city, phone, logo){
            this.create=false
            this.id=id
            this.name=name
            this.address=address
            this.city=city
            this.phone=phone
            this.logo=logo
        },
        createAction(){
            this.create=true
            this.id=null
           
        },
    },
    getters:{
        title:(state)=>{
            return (state.create)?'Registro':`Actualizar ${state.name}`;
        },
        buttonText:(state)=>{
            return (state.create)?'Registrar':'Actualizar';
        }
    }
});