/* Con esta función creo los productos del carrito */
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
                actualizarTotalCarrito()
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
                    //actualizarPrecio(elm)
                    //reiniciarCarrito()
                    
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
    document.getElementById("comprar").addEventListener("click", () => {
        mostrarFormularioCompra();
    });
}

// BOTON DE COMPRA

const mostrarFormularioCompra = () => {
    // Mostrar formulario de compra
    contenedorCarrito.innerHTML = `
        <h2>Finaliza tu compra</h2>
            <form id="formulario-compra">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" required><br>
                
                <label for="direccion">Dirección:</label>
                <input type="text" id="direccion" required><br>
                
                <label for="email">Email:</label>
                <input type="email" id="email" required><br>
                
                <button type="submit" id="finalizar-compra">Finalizar Compra</button>
            </form>
        <div id="resumen-compra"></div>
    `;

    // Mostrar resumen de compra
    let total = productos.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    let resumenCompra = document.getElementById("resumen-compra");
    resumenCompra.innerHTML = `
        <h3>Resumen de tu compra</h3>
        <ul>
            ${productos.map(prod => `
                <li>${prod.nombre} - Cantidad: ${prod.cantidad} - Precio: $${prod.precio}</li>
            `).join('')}
        </ul>
        <p><strong>Total: $${total}</strong></p>
    `;
    let tituloCart = document.getElementById("titulo-cart");
    // Evento de finalizar compra
    document.getElementById("formulario-compra").addEventListener("submit", (e) => {
        e.preventDefault();

        // Limpiar carrito y localStorage después de mostrar el resumen
        productos = [];
        actualizarLocalStorage();
        actualizarNumeroCarrito()
        const sectionTotales = document.getElementById("totales");
        if (sectionTotales) {
            sectionTotales.remove(); // Borra la sección del DOM
        }

        Swal.fire({
            title: "Compra finalizada",
            text: "¡Muchas gracias por tu compra!",
            icon: "success"
          });
        contenedorCarrito.innerHTML = `<h2>¡Gracias por tu compra!</h2>`;
        tituloCart.innerHTML = ""
    });

};

function actualizarLocalStorage() {
    localStorage.setItem("figura", JSON.stringify(productos)); // Actualiza localStorage
}


/* Boton para reiniciar carrito */
const botonReiniciarCarrito = document.getElementById("reiniciar-carrito");

botonReiniciarCarrito.addEventListener("click", () => {
    productos = []; // Vacía el array de productos
    actualizarLocalStorage(); // Actualiza el localStorage con el carrito vacío
    crearTarjetaCarrito(); // Actualiza la vista del carrito en el DOM
    actualizarPrecio(); // Actualiza el precio total a 0
    actualizarNumeroCarrito() // Actualiza el numero del carrito a 0
    actualizarTotalCarrito()
});

const totalUnidades = document.getElementById("unidades")

const actualizarTotalCarrito = (() => {
    const memoria = JSON.parse(localStorage.getItem("figura"))
    const cuenta = memoria.reduce((acum,current) => acum+current.cantidad, 0)
    totalUnidades.innerText = cuenta
    
})

actualizarNumeroCarrito()
crearTarjetaCarrito();
actualizarPrecio()
actualizarTotalCarrito()
