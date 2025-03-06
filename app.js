// JavaScript - Gestión de Inventario

let inventario = [];

const objProducto = {
    id: '',
    nombre: '',
    cantidad: '',
    precio: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const cantidadInput = document.querySelector('#cantidad');
const precioInput = document.querySelector('#precio');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || cantidadInput.value === '' || precioInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarProducto();
        editando = false;
    } else {
        objProducto.id = Date.now();
        objProducto.nombre = nombreInput.value;
        objProducto.cantidad = cantidadInput.value;
        objProducto.precio = precioInput.value;

        agregarProducto();
    }
}

function agregarProducto() {
    inventario.push({...objProducto});
    mostrarInventario();
    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objProducto.id = '';
    objProducto.nombre = '';
    objProducto.cantidad = '';
    objProducto.precio = '';
}

function mostrarInventario() {
    limpiarHTML();
    const divInventario = document.querySelector('.div-inventario');
    
    inventario.forEach(producto => {
        const {id, nombre, cantidad, precio} = producto;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - Cantidad: ${cantidad} - Precio: $${precio}`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarProducto(producto);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarProducto(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divInventario.appendChild(parrafo);
        divInventario.appendChild(hr);
    });
}

function cargarProducto(producto) {
    const {id, nombre, cantidad, precio} = producto;
    nombreInput.value = nombre;
    cantidadInput.value = cantidad;
    precioInput.value = precio;
    objProducto.id = id;
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;
}

function editarProducto() {
    objProducto.nombre = nombreInput.value;
    objProducto.cantidad = cantidadInput.value;
    objProducto.precio = precioInput.value;

    inventario = inventario.map(producto => producto.id === objProducto.id ? {...objProducto} : producto);

    limpiarHTML();
    mostrarInventario();
    formulario.reset();
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    editando = false;
}

function eliminarProducto(id) {
    inventario = inventario.filter(producto => producto.id !== id);
    limpiarHTML();
    mostrarInventario();
}

function limpiarHTML() {
    const divInventario = document.querySelector('.div-inventario');
    while(divInventario.firstChild) {
        divInventario.removeChild(divInventario.firstChild);
    }
}
