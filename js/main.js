/*Con esta funcion creo los productos disponibles */

const contenedorProductos = document.getElementById("contenedor-productos")

stockProductos.forEach((producto) => {

    const div = document.createElement("div")

    div.classList.add("producto")

    div.innerHTML = `
    <img src="${producto.img}">
    <hr>
    <h5>${producto.nombre}</h5>
    <p>Precio: $${producto.precio}</p>

    <button class="btn" data-id="${producto.id}">Comprar</button>
    `
    contenedorProductos.appendChild(div)

    div.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
    
})