/*Con esta funcion creo los productos disponibles */
const contenedorCarrito = document.getElementById("contenedor-carrito")
const productos = JSON.parse(localStorage.getItem("figura"))

if(productos && productos.length >0){
    productos.forEach((elm) => {

        const div = document.createElement("div")
    
        div.classList.add("productos-carrito")
    
        div.innerHTML = `
        <img src=".${elm.img}">
        <hr>
        <h5>${elm.nombre}</h5>
        <p>Precio: $${elm.precio}</p>
        <div>
            <button class="btn">-</button>
            <span class= "cantidad">0</span>
            <button class="btn">+</button>
        </div>
        `
        contenedorCarrito.appendChild(div)
    
        
        
    })
}

