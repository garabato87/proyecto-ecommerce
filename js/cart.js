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
                <p>${elm.nombre}</p>
                <p>Precio: $${elm.precio}</p>
                <div>
                    <button class="btn-restar">-</button>
                    <span class="cantidad">${elm.cantidad}</span>
                    <button class="btn-sumar">+</button>
                </div>
            `;

            contenedorCarrito.appendChild(div);

            // Event listener para sumar producto
            div.getElementsByClassName("btn-sumar")[0].addEventListener("click", () => {
                agregarAlCarrito(elm);
                elm.cantidad++;
                actualizarLocalStorage();
                crearTarjetaCarrito(); // Actualiza el DOM
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
                }
                actualizarLocalStorage(); // Guarda los cambios en localStorage
                crearTarjetaCarrito(); // Actualiza el DOM
            });
        });
    } else {
        contenedorCarrito.innerHTML = `<p id="carro-vacio">El carrito está vacío</p>`; // Mensaje cuando no hay productos
    }
}

function actualizarLocalStorage() {
    localStorage.setItem("figura", JSON.stringify(productos)); // Actualiza localStorage
}

crearTarjetaCarrito();
