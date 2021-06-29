
const input=document.querySelectorAll('.tags-input input');

//CREAMOS LOS ELEMENTOS TAGS
function _crearTags(texto){

    const span = document.createElement("span");
    span.setAttribute('class',"tag tag-color");
    span.innerHTML= texto;

    const cerrar = document.createElement("i");
    cerrar.setAttribute('class',"fas fa-times");
    cerrar.setAttribute('data-close',"cerrar");
    cerrar.setAttribute('data-item',texto);

    span.appendChild(cerrar);
    return span;
}


//ELIMINAMOS EL ULTIMO TAG AL USAR LA TECLA BORRAR, TANTO EL HTML COMO EN EL ARRAY
function _eliminarUltimo(tagsInput,dataTags,dataInput){

    
    if(tagsInput.children.length>1){
        dataTags.pop();
        dataInput.value=dataTags;
        return tagsInput.removeChild(tagsInput.children[tagsInput.children.length-2]);
   }

}

//VALIDAMOS SI UN TAG ES REPETIDO
function _validarTagsDuplicados(dataTags,e){

    var estado=false;

    if(dataTags.length>0){

        dataTags.forEach(element => {


            if(element[0].toLowerCase()==e.target.value.replace(",", "").toLowerCase()){
                estado=true;
                
            }
           
        });
        
    }

    return estado;
}

//RECORREMOS TODO LOS INPUT TAGS QUE TENGAMOS EN NUESTRA PAGINA CON EL CICLO FOREACH
input.forEach(tag => {
    
    let dataTags = [];
    //POR CADA INPUT GENERAMOS UN EVENTO 
    //KEYUP : El evento keyup ocurre cuando el usuario suelta una tecla (en el teclado).
    tag.addEventListener('keyup',(e)=>{

        const tagsInput=e.target.parentNode;
        const dataInput=e.target.parentNode.parentNode.querySelector('[data-role]');

        if(e.target.value !==""){

            const validar=_validarTagsDuplicados(dataTags,e);

            //GUARDAMOS UN TAG CUANDO EL USARIO HIZO ENTER O INGRESO UNA COMA(,)
            if(e.target.value.trim().includes(",") || e.key ==='Enter'){

                if(validar==false){
                    
                    const tag=_crearTags(e.target.value.replace(",", ""));
                    tagsInput.insertBefore(tag, tagsInput.lastElementChild);
                
                    let valorTag = e.target.value.replace(",", "").split(",");
                    dataTags.push(valorTag);

                    dataInput.value=dataTags;

                    e.target.value="";
                }else{
                    e.target.value="";
                }
            }
            
        }
        
    })

    //KEYDOWN : El evento keydown ocurre cuando el usuario está presionando una tecla (en el teclado).
   tag.addEventListener('keydown',(e)=>{

        const tagsInput=e.target.parentNode;
        const dataInput=e.target.parentNode.parentNode.querySelector('[data-role]');

        //BORRAMOS UN TAG CUANDO EL EL USUARIO USO LA TECLA BORRAR DEL TECLADO
        if(e.key==='Backspace' && e.target.value===''){
            _eliminarUltimo(tagsInput,dataTags,dataInput);
        }
   })

   //ESTE EVENTO ES PARA BORRAR UNA TAG INDEPEDIENTE O EL QUE DESEAMOS DE NUESTRO INPUT (haciendo click en la x);
    tag.parentNode.addEventListener('click',(span)=>{

        

        if (span.target.tagName.toLowerCase() === 'i') {
        
            const value=span.target.getAttribute('data-item');

            const dataInput=span.target.parentNode.parentNode.parentNode.querySelector('[data-role]');
            
            for (var i = 0; i < dataTags.length; i++) {
                if (dataTags[i] == value) {
                    dataTags.splice(i, 1);
                }
            }

            dataInput.value=dataTags;

            tag.parentNode.removeChild(span.target.parentNode);
           
        }

    })
    

});



//Mostrando datos input
document.querySelector('.btn').addEventListener('click',(e)=>{
    e.preventDefault();

    const form=document.querySelector('.formulario');
    const data=document.querySelector('.mostrar-datos');

    data.innerHTML='<h2>Colores:</h2><p>'+form.list_color.value+'</p>';
    data.innerHTML+='<h2>Países:</h2><p>'+form.list_paises.value+'</p>';



})