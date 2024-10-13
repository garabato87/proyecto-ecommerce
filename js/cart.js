/* Con esta función creo los productos disponibles */
const contenedorCarrito = document.getElementById("contenedor-carrito");
let productos = JSON.parse(localStorage.getItem("figura")); // Cambié a let para poder modificarlo

function crearTarjetaCarrito() {
    contenedorCarrito.innerHTML = ""; // Limpiar el contenedor antes de agregar productos

    if (productos && productos.length > 0) {
        productos.forEach((elm) => {
            const div = document.createElement("div");
            div.classList.add("productos-carrito");
            
            div.innerHTML = `
                <img src=".${elm.img}">
                <div id="desc-carrito">
                    <p>${elm.nombre}</p>
                    <p>Precio: $${elm.precio}</p>
                    
                    <div>
                        <button class="btn-restar">-</button>
                        <span class="cantidad">${elm.cantidad}</span>
                        <button class="btn-sumar">+</button>
                    </div>
                </div>
            `;

            contenedorCarrito.appendChild(div);

            // Event listener para sumar producto
            

            div.getElementsByClassName("btn-sumar")[0].addEventListener("click", () => {
                agregarAlCarrito(elm);
                elm.cantidad++;
                actualizarLocalStorage();
                crearTarjetaCarrito(); // Actualiza el DOM
                actualizarPrecio()
            });

            // Event listener para restar producto
            div.getElementsByClassName("btn-restar")[0].addEventListener("click", () => {
                if (elm.cantidad > 1) {
                    elm.cantidad--;
                    restarAlCarrito(elm);
                } else {
                    // Si la cantidad es 1, eliminamos el producto del carrito
                    productos = productos.filter(producto => producto.id !== elm.id); // Elimina el producto del array
                    div.remove(); // Elimina la tarjeta del DOM
                    restarAlCarrito(elm);
                    actualizarPrecio()
                    
                }
                actualizarLocalStorage(); // Guarda los cambios en localStorage
                crearTarjetaCarrito(); // Actualiza el DOM
                actualizarPrecio()
            });
            
        });
    } else {
        contenedorCarrito.innerHTML = `
        <h4 id="carro-vacio">El carrito está vacío</h4>
        
        `; // Mensaje cuando no hay productos
        actualizarPrecio()
    }
}

function actualizarLocalStorage() {
    localStorage.setItem("figura", JSON.stringify(productos)); // Actualiza localStorage
}


actualizarNumeroCarrito()
crearTarjetaCarrito();
actualizarPrecio()


/* Boton para reiniciar carrito */
const botonReiniciarCarrito = document.getElementById("reiniciar-carrito");

botonReiniciarCarrito.addEventListener("click", () => {
    productos = []; // Vacía el array de productos
    actualizarLocalStorage(); // Actualiza el localStorage con el carrito vacío
    crearTarjetaCarrito(); // Actualiza la vista del carrito en el DOM
    actualizarPrecio(); // Actualiza el precio total a 0
    actualizarNumeroCarrito() // Actualiza el numero del carrito
});
