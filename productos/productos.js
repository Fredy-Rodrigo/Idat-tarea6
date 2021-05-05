let boxCategoria = document.querySelector('#comboboxCategoria');
let textoProducto = document.querySelector('#producto');
let botonBuscar = document.querySelector('#botonBuscar');
let body = document.querySelector('#body');


const cargarComboCategoria = (event) => {
    event.preventDefault();
    fetch('https://disenoydesarrolloweb.azurewebsites.net/api/Producto/Categorias')
        .then(response => response.json())
        .then(listaCategoria => llenarListaCategoria(listaCategoria))
}

const llenarListaCategoria = (listaCategoria) => {
    let comboCategoria = document.querySelector('#comboboxCategoria');

    listaCategoria.categorias.forEach(categoria => {
        comboCategoria.innerHTML += `<option value="${categoria}">${categoria}</option>`;
    });
}


const buscarProductos = (event) => {
    event.preventDefault();

    obtenerProductosAPI();
}

const obtenerProductosAPI = () => {
    const uri = 'https://disenoydesarrolloweb.azurewebsites.net/api/Producto';
    let categoria = boxCategoria.value;
    let nombre = textoProducto.value;

    productosUri = `${uri}?categoria=${categoria}&nombre=${nombre}`;

    fetch(productosUri)
        .then(response => response.json())
        .then(data => imprimirProductosPantalla(data))
}

const imprimirProductosPantalla = (productos) => {
    let contenidoTabla = document.querySelector('#contenidoTabla');
    contenidoTabla.innerHTML = '';
    productos.forEach(producto => {
        contenidoTabla.innerHTML += `<tr>
        <td>${producto.codigo}</td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>S/.${producto.precio}</td>
        <td>${producto.proveedor}</td>
        <td><button class='boton-modificar' onclick="location.href='../agregar/agregar.html'"> <img src="../imagenes/modificar.png" alt="modificar" class="img-modificar"> </button></td>
        <td><button class='boton-eliminar' id=${producto.id}> <img src="../imagenes/eliminar.png" alt="eliminar" class="img-eliminar" id=${producto.id}> </button></td>
        </tr>`;
    });
}


const eliminarProducto = (event) => {
    event.preventDefault();

    console.log(`${event.target.id}`);
    console.log(`${event.target.className}`); 
    if (event.target.className == 'boton-eliminar' || event.target.className == 'img-eliminar') {

        fetch(`https://disenoydesarrolloweb.azurewebsites.net/api/Producto/${event.target.id}`,
            {
                method : 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                buscarProductos(event);
            })
    }
} 


botonBuscar.addEventListener('click',buscarProductos);
window.addEventListener('load',cargarComboCategoria); 
body.addEventListener('click',eliminarProducto);