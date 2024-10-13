/*Con esta funcion creo los productos disponibles 

const contenedorProductos = document.getElementById("contenedor-productos")

stockProductos.forEach((producto) => {

    const div = document.createElement("div")

    div.classList.add("producto")

    div.innerHTML = `
    <img src="${producto.img}">
    <hr>
    <h5>${producto.nombre}</h5>
    <p>Precio: $${producto.precio}</p>

    <button class="btn">Agregar al carrito</button>
    `
    contenedorProductos.appendChild(div)

    div.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
    
})

*/


// Función para renderizar los productos
function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById("contenedor-productos");
    contenedorProductos.innerHTML = ""; // Limpiar los productos actuales
    
    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.img}">
            <hr>
            <h5>${producto.nombre}</h5>
            <p>Precio: $${producto.precio}</p>
            <button class="btn">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(div);

        div.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto));
    });
}

// Mostrar todos los productos al cargar la página
mostrarProductos(stockProductos);

// Función de búsqueda
function buscarProducto() {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    
    // Filtrar los productos basados en el término de búsqueda
    const productosFiltrados = stockProductos.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTerm)
    );
    
    // Mostrar solo los productos filtrados
    mostrarProductos(productosFiltrados);
}

