const precioTotal = document.getElementById("precio")
const reiniciarCarrito = document.getElementById("reiniciar-carrito")



//Funcion para agregar al carrito
function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("figura")) //accede al localStorage del navegador y obtiene el valor asociado con la clave "figura".
    
    if (!memoria){ //Si memoria no tiene valor asignado
        const nuevoProducto = getNuevoProductoParaMemoria(producto)
        localStorage.setItem("figura",JSON.stringify([nuevoProducto]))
    }else {
        const indiceProducto = memoria.findIndex(figura => figura.id === producto.id)
       
        const nuevaMemoria = memoria
        
        if (indiceProducto === -1){
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))  

        } else {
            nuevaMemoria[indiceProducto].cantidad++;

        }
        localStorage.setItem("figura",JSON.stringify(nuevaMemoria))
        actualizarNumeroCarrito()
    }
    Toastify({
        text: `Producto agregado al carrito`,
        duration: 2000,
        gravity: "top",
        close: true,
        position: "right",
        style: {
            background: "linear-gradient(to right, #822ef5, #c76cf5)",
        }
    }).showToast();
    
}

/*Toma un producto, le agrega cantidad 1 y lo devuelve */
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto 
    nuevoProducto.cantidad= 1
    return nuevoProducto
}

//Funcion para restar al carrito
const restarAlCarrito = ((producto)=>{
    const memoria = JSON.parse(localStorage.getItem("figura"))
    const indiceProducto = memoria.findIndex(figura => figura.id === producto.id)
    if(memoria[indiceProducto].cantidad === 1){
        memoria.splice(indiceProducto,1)
        localStorage.setItem("figura",JSON.stringify(memoria))
    } else{
        memoria[indiceProducto].cantidad--;
    }
    localStorage.setItem("figura", JSON.stringify(memoria));
    actualizarNumeroCarrito()
    actualizarTotalCarrito()
})


/*Contador del carrito*/
const cuentaCarritoElement = document.getElementById("cuenta-carrito")


const actualizarNumeroCarrito = (() => {
    const memoria = JSON.parse(localStorage.getItem("figura"))
    const cuenta = memoria.reduce((acum,current) => acum+current.cantidad, 0)
    cuentaCarritoElement.innerText = cuenta
    
})


function actualizarPrecio() {
    const productos = JSON.parse(localStorage.getItem("figura"))
    let precio = 0
    if (productos && productos.length > 0){
        productos.forEach(producto =>{
            precio += producto.precio * producto.cantidad
        })
        precioTotal.innerText = precio
    }else precioTotal.innerText = "0"
}

actualizarNumeroCarrito()



