function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("figura"))
    console.log(memoria)
    if (!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(producto)
        localStorage.setItem("figura",JSON.stringify([nuevoProducto]))
    }else {
        const indiceProducto = memoria.findIndex(figura => figura.id === producto.id)
        console.log(indiceProducto);
        const nuevaMemoria = memoria
        
        if (indiceProducto === -1){
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))  

        } else {
            nuevaMemoria[indiceProducto].cantidad++;

        }

        localStorage.setItem("figura",JSON.stringify(nuevaMemoria))
        actualizarNumeroCarrito()
    }
}

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
})

/*Toma un producto, le agrega cantidad 1 y lo devuelve */
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto 
    nuevoProducto.cantidad= 1
    return nuevoProducto
}

/*Contador del carrito*/
const cuentaCarritoElement = document.getElementById("cuenta-carrito")
const totalUnindades = document.getElementById("unidades")
const actualizarNumeroCarrito = (() => {
    const memoria = JSON.parse(localStorage.getItem("figura"))
    const cuenta = memoria.reduce((acum,current) => acum+current.cantidad, 0)
    cuentaCarritoElement.innerText = cuenta
    totalUnindades.innerText = cuenta
})

actualizarNumeroCarrito()

