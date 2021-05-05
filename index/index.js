let mainFrame = document.querySelector('#mainFrame');
let menuListadoProducto = document.querySelector('#menuListadoProducto');
let menuAgregarProducto = document.querySelector('#menuAgregarProducto');

const mostrarListadoProducto = (event) => {
    event.preventDefault();
    mainFrame.src = "../productos/productos.html"
}

const mostrarAgregarProducto = (event) => {
    event.preventDefault();
    mainFrame.src = "../agregar/agregar.html";
}

menuListadoProducto.addEventListener('click',mostrarListadoProducto);
menuAgregarProducto.addEventListener('click',mostrarAgregarProducto);
