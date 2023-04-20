import {defineStore} from 'pinia';
//Importamos los helpers de las peticiones HTTP.
import fetchData from '../../../helpers/fetchData.js';

const URL= ' ';
export const  useTypeStore=defineStore('types',{
    state:()=>({
        types:[],
    }),
    actions:{
        async getTypes(){
           const {data}=await fetchData(URL);
           this.types=data;
           this.sortById();
        },
        
        getTypeById(id){
            const index=this.types.map(el=>el._id).indexOf(id);
            return this.types[index]; 
        },
        
        addType(type){
            this.types.push(type);
            //Petición HTTP...
             const data={name:type.name}
             fetchData(URL,'post',data);
            
        },
        updateType(id,newType){ 
            const index=this.types.map(el=>el._id).indexOf(id); //El índice que debo alterar.
            this.types[index]=newType;
            //Petición HTTP...
            const url=`${URL}/${id}`;
            const data={name:newType.name};
            console.log(data);
            fetchData(url,'put',data); ///PUT
        },
        deleteType(id){
            const index=this.types.map(el=>el._id).indexOf(id); //El índice que debo borrar.
            this.types.splice(index,1);
            //Petición HTTP...
            const url=`${URL}/${id}`;
            fetchData(url,'delete');
        },
        sortById(){
            // this.types.sort((a,b)=>a.id-b.id);
        }

    }
    
});