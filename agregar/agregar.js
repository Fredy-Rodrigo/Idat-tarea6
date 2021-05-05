let botonAgregar = document.querySelector('#botonAgregar');
const uriApi = 'https://disenoydesarrolloweb.azurewebsites.net/api/Producto';


const cargarListaCategoria = (event) => {
    event.preventDefault();
    fetch('https://disenoydesarrolloweb.azurewebsites.net/api/Producto/Categorias')
        .then(response => response.json())
        .then(data => llenarListaCategoria(data))
}

const llenarListaCategoria = (data) => {
    let comboCategoria = document.querySelector('#comboCategoria');

    data.categorias.forEach(categoria => {
        comboCategoria.innerHTML += `<option value="${categoria}">${categoria}</option>`;
    });
}

const crearNuevoProducto = (event) => {
    event.preventDefault(); 
    let codigo = document.querySelector('#codigo').value;
    let nombre = document.querySelector('#nombre').value;
    let categoria = document.querySelector('#comboCategoria').value;
    let ruc = document.querySelector('#ruc').value;
    let proveedor = document.querySelector('#proveedor').value;
    let precio = document.querySelector('#precio').value;
    let fecha = document.querySelector('#fecha').value;
    let impuesto = document.querySelector('#impuesto').value;
    let descripcion = document.querySelector('#descripcion').value;

    let producto = {"codigo":codigo, "nombre":nombre, "descripcion":descripcion, "fechaIngreso":fecha, "estado":1, "afectoIGV":true, "precio":precio, "ruc":ruc, "proveedor":proveedor, "categoria":categoria, "esActivo":true};

    console.log(producto);

    fetch(uriApi, {
        method : 'POST',
        body :  JSON.stringify(producto),
        headers : {'Content-Type' : 'application/json'}
    })
    .then(response => response.text())
    .then(data => alert(`Se creo un nuevo producto, cuyo id es ${data}`))
}

window.addEventListener('load',cargarListaCategoria);
botonAgregar.addEventListener('click', crearNuevoProducto);