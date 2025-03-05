document.addEventListener('DOMContentLoaded', cargarProductos);

document.getElementById('productoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;

    const producto = { nombre, descripcion, precio, cantidad };

    if (id) {
        await fetch(`/api/productos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
    } else {
        await fetch('/api/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
    }

    limpiarFormulario();
    cargarProductos();
});

async function cargarProductos() {
    const response = await fetch('/api/productos');
    const productos = await response.json();
    const tbody = document.getElementById('productosTableBody');
    tbody.innerHTML = '';

    productos.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.descripcion || ''}</td>
            <td>${parseFloat(producto.precio).toFixed(2)}</td>
            <td>${producto.cantidad}</td>
            <td>
                <button onclick='editarProducto(${JSON.stringify(producto)})'>Editar</button>
                <button onclick='eliminarProducto(${producto.id})'>Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editarProducto(producto) {
    document.getElementById('id').value = producto.id;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('descripcion').value = producto.descripcion || '';
    document.getElementById('precio').value = producto.precio;
    document.getElementById('cantidad').value = producto.cantidad;
}

async function eliminarProducto(id) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        await fetch(`/api/productos/${id}`, { method: 'DELETE' });
        cargarProductos();
    }
}

function limpiarFormulario() {
    document.getElementById('productoForm').reset();
    document.getElementById('id').value = '';
}