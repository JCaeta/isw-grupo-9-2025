// Verificar que existan datos de compra
const datosCompra = JSON.parse(sessionStorage.getItem("datosCompra"))

if (!datosCompra) {
  window.location.href = "../index.html"
}

// Mostrar detalles de la compra
document.getElementById("usuario").textContent = datosCompra.usuario
document.getElementById("metodoPago").textContent = datosCompra.metodoPago
document.getElementById("fechaVisita").textContent = new Date(datosCompra.fechaVisita).toLocaleDateString("es-AR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})
document.getElementById("horaVisita").textContent = datosCompra.horaVisita
document.getElementById("cantidadEntradas").textContent = datosCompra.cantidad
document.getElementById("totalPrecio").textContent = datosCompra.total.toLocaleString("es-AR")

