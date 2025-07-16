//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();

//Funciones
function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //muestra los cursos de local storage
    document.addEventListener('DOMContentLoaded', () =>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    })

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}

function eliminarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        
        //eliminamos del arreglo por el id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        //llamamos a que imprima de nuevo el HTML asi lo muestra
        carritoHTML();
    }

}



function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);

    if(existe){
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna objeto actualizado
            }
            else{
                return curso; //retorna primer objeto, cuando no esta actualizado
            }
        });
        articulosCarrito=[...cursos];
    }
    else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}


//mostramos el carrito en el HTML
function carritoHTML(){

    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src ="${imagen}" width ="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href ="#" class = "borrar-curso" data-id ="${id}"> X </a>
        </td>
        `;
        
        //mostramos en el html
        contenedorCarrito.appendChild(row);
    });

    //agregar el carrito de compras al storage
    sincronizarStorage()
}


function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function limpiarHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
