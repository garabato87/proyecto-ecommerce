
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
//Cambie de funcion para poder reutilizarla


/* Función para renderizar los productos -- NO UTILIZO ESTA YA QUE DEBO IMPLEMENTAR FETCH --
const mostrarProductos = (productos) => {
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

        div.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto),);
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
*/
// Función para mostrar productos
const bannerInicio = () =>{
    const contenedorInicio = document.getElementById("welcome")
    contenedorInicio.innerHTML= "" ;
    const div = document.createElement("div")
    div.classList.add("inicio-container")
    div.innerHTML = `
        <div id="inicio">
            <h2>IMPRESION 3D DE ALTA CALIDAD </h2>
            <p>Transformamos tus ideas en realidad con tecnología de última generación y experiencia profesional</p>
            <a href=""><button class="">Comenzar ahora</button></a>
            <a href="#productos"><button class="">Ver catalogo</button></a>
        </div>
        <img src="media/impresora-icon.png">
    `
    contenedorInicio.appendChild(div);
}
bannerInicio()

const mostrarProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedor-productos");
    contenedorProductos.innerHTML = ""; // Limpiar los productos actuales
    
    productos.forEach((elm) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        
        div.innerHTML = `
            <img src="${elm.img}">
            <hr>
            <h5>${elm.nombre}</h5>
            <p>Precio: $${elm.precio}</p>
            <button class="btn">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(div);

        div.getElementsByClassName("btn")[0].addEventListener("click", () =>{
            agregarAlCarrito(elm)
            
        });
    });
    
}

// Función para cargar productos desde el archivo JSON con fetch
/*
const cargarProductos = () => {
    
        fetch('./stock.json')
            .then(response => response.json())
            .then(data => {
                mostrarProductos(data);
            })
    
}*/
const cargarProductos = async () => {
    try {
        const response = await fetch('./stock.json');
        const data = await response.json();
        mostrarProductos(data);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    } finally {
        console.log('Finalización de la carga de productos');
    }
};


// Función de búsqueda
function buscarProducto() {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    
    // Filtrar los productos basados en el término de búsqueda
    fetch('./stock.json')
        .then(response => response.json())
        .then(data => {
            const productosFiltrados = data.filter(producto =>
                producto.nombre.toLowerCase().includes(searchTerm)
            );
            
            setTimeout(()=>{
                mostrarProductos(productosFiltrados);
            }, 2000)
        })
        .catch(error => console.error('Error al buscar productos:', error));
}

// Cargar los productos al iniciar la página
document.addEventListener("DOMContentLoaded", cargarProductos);

actualizarNumeroCarrito()
