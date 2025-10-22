// Verificar que existan datos de compra
const datosCompra = JSON.parse(sessionStorage.getItem("datosCompra"))

if (!datosCompra) {
  window.location.href = "../index.html"
}

// Mostrar datos en el email mockup
document.getElementById("emailUsuario").textContent = datosCompra.usuario
document.getElementById("emailFecha").textContent = new Date(datosCompra.fechaVisita).toLocaleDateString("es-AR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})
document.getElementById("emailHora").textContent = datosCompra.horaVisita
document.getElementById("emailCantidad").textContent = datosCompra.cantidad
document.getElementById("emailMetodo").textContent = datosCompra.metodoPago
document.getElementById("emailTotal").textContent = datosCompra.total.toLocaleString("es-AR")

function continuarConfirmacion() {
  window.location.href = "confirmacion.html"
}
