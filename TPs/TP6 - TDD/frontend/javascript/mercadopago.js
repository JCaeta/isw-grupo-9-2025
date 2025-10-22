// Verificar que existan datos de compra
const datosCompra = JSON.parse(sessionStorage.getItem("datosCompra"))

if (!datosCompra) {
  window.location.href = "../index.html"
}

// Mostrar monto
document.getElementById("montoPago").textContent = datosCompra.total.toLocaleString("es-AR")

// Simular procesamiento de pago
let progress = 0
const progressFill = document.querySelector(".progress-fill")
const processingText = document.querySelector(".processing-text")
const estadoPago = document.getElementById("estadoPago")

const mensajes = [
  "Conectando con Mercado Pago...",
  "Verificando datos de pago...",
  "Procesando transacción...",
  "Confirmando pago...",
  "¡Pago exitoso!",
]

let mensajeIndex = 0

const interval = setInterval(() => {
  progress += 2
  progressFill.style.width = `${progress}%`

  // Cambiar mensaje cada 20%
  if (progress % 20 === 0 && mensajeIndex < mensajes.length - 1) {
    mensajeIndex++
    processingText.textContent = mensajes[mensajeIndex]
  }

  if (progress >= 100) {
    clearInterval(interval)
    processingText.textContent = mensajes[mensajes.length - 1]
    estadoPago.textContent = "Aprobado ✓"
    estadoPago.classList.remove("status-processing")
    estadoPago.classList.add("status-success")

    // Redirigir a página de email después de 1.5 segundos
    setTimeout(() => {
      window.location.href = "email.html"
    }, 1500)
  }
}, 50)
