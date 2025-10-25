const nombreUsuario = sessionStorage.getItem("usuario")
if (!nombreUsuario) {
  window.location.href = "../index.html"
}

const max_entradas = 10

// Crear instancia de Usuario registrado
const usuarioActual = new Usuario(nombreUsuario, true)

// Mostrar mensaje de bienvenida
document.getElementById("welcomeMessage").textContent = `Bienvenido, ${nombreUsuario}`

// Establecer fecha mínima (hoy)
const hoy = new Date().toISOString().split("T")[0]
document.getElementById("fechaVisita").setAttribute("min", hoy)

// Generar campos de entradas dinámicamente
document.getElementById("cantidadEntradas").addEventListener("change", function () {
  const cantidad = Number.parseInt(this.value)
  const container = document.getElementById("entradasContainer")
  container.innerHTML = ""

  for (let i = 1; i <= cantidad; i++) {
    const entradaDiv = document.createElement("div")
    entradaDiv.className = "entrada-item"
    entradaDiv.innerHTML = `
      <h4>🎫 Entrada ${i}</h4>
      <div class="entrada-row">
        <div class="form-group">
          <label for="edad${i}">Edad del Visitante</label>
          <input type="number" id="edad${i}" name="edad${i}" min="0" max="120" required placeholder="Ej: 25">
        </div>
        <div class="form-group">
          <label for="tipo${i}">Tipo de Entrada</label>
          <select id="tipo${i}" name="tipo${i}" required>
            <option value="">Seleccionar...</option>
            <option value="Regular">Regular - $5,000</option>
            <option value="VIP">VIP - $10,000</option>
          </select>
        </div>
      </div>
      <div class="precio-info" id="precio${i}">Precio: $0</div>
    `
    container.appendChild(entradaDiv)
  }

  // Agregar listeners para calcular precio individual y total
  agregarListenersCalculoPrecio()
})

// Inicializar con 1 entrada
document.getElementById("cantidadEntradas").dispatchEvent(new Event("change"))

function agregarListenersCalculoPrecio() {
  const cantidad = Number.parseInt(document.getElementById("cantidadEntradas").value)
  for (let i = 1; i <= cantidad; i++) {
    const edadInput = document.getElementById(`edad${i}`)
    const tipoSelect = document.getElementById(`tipo${i}`)

    if (edadInput && tipoSelect) {
      edadInput.addEventListener("input", () => calcularPrecioEntrada(i))
      tipoSelect.addEventListener("change", () => calcularPrecioEntrada(i))
    }
  }
}

function calcularPrecioEntrada(index) {
  const edad = Number.parseInt(document.getElementById(`edad${index}`).value)
  const tipo = document.getElementById(`tipo${index}`).value

  if (edad >= 0 && tipo) {
    const entrada = new Entrada(edad, tipo)
    const precio = entrada.calcularPrecio()
    document.getElementById(`precio${index}`).textContent = `Precio: $${precio.toLocaleString("es-AR")}`
  }

  calcularTotal()
}

function calcularTotal() {
  let total = 0
  const cantidad = Number.parseInt(document.getElementById("cantidadEntradas").value)

  for (let i = 1; i <= cantidad; i++) {
    const edad = Number.parseInt(document.getElementById(`edad${i}`).value)
    const tipo = document.getElementById(`tipo${i}`).value

    if (edad >= 0 && tipo) {
      const entrada = new Entrada(edad, tipo)
      total += entrada.calcularPrecio()
    }
  }

  document.getElementById("totalPrecio").textContent = total.toLocaleString("es-AR")
}

// Validar y continuar al pago
document.getElementById("btnContinuar").addEventListener("click", function () {
  const errorMessage = document.getElementById("errorMessage")
  errorMessage.classList.remove("show")

  try {
    // Validar fecha
    const fechaVisita = document.getElementById("fechaVisita").value
    if (!fechaVisita) {
      throw new Error("Por favor, seleccione una fecha de visita")
    }

    // Validar hora
    const horaVisita = document.getElementById("horaVisita").value
    if (!horaVisita) {
      throw new Error("Por favor, seleccione una hora de visita")
    }

    // Crear fecha completa con hora
    const [year, month, day] = fechaVisita.split("-")
    const [hour, minute] = horaVisita.split(":")
    const fechaCompleta = new Date(year, month - 1, day, hour, minute)

    const fechaHoy = new Date()
    fechaHoy.setHours(0, 0, 0, 0)

    if (fechaCompleta < fechaHoy) {
      throw new Error("La fecha de visita no puede ser anterior al dia de hoy")
    }

    // Validar cantidad de entradas
    const cantidad = Number.parseInt(document.getElementById("cantidadEntradas").value)
    if (cantidad < 1 || cantidad > max_entradas) {
      throw new Error("Debe comprar entre 1 y 10 entradas")
    }

    // Crear array de entradas y validar
    const entradas = []
    for (let i = 1; i <= cantidad; i++) {
      const edad = document.getElementById(`edad${i}`).value
      const tipo = document.getElementById(`tipo${i}`).value

      if (!edad || !tipo) {
        throw new Error(`Por favor, complete todos los datos de la entrada ${i}`)
      }

      const edadNum = Number.parseInt(edad)
      if (edadNum < 0 || edadNum > 120) {
        throw new Error(`La edad de la entrada ${i} no es válida`)
      }

      entradas.push(new Entrada(edadNum, tipo))
    }

    const compra = new Compra(usuarioActual, fechaCompleta, entradas, null)

    // Validar fecha (lunes, festivos, horario)
    compra.validarFecha()

    // Calcular total
    const total = compra.calcularTotal()

    if (total === 0) {
      throw new Error("El total de la compra debe ser mayor a 0")
    }

    // Guardar datos en sessionStorage
    const datosCompra = {
      usuario: nombreUsuario,
      fechaVisita: fechaVisita,
      horaVisita: horaVisita,
      cantidad: cantidad,
      total: total,
      entradas: entradas.map((e) => ({
        edad: e.edad,
        tipo: e.tipo,
        precio: e.calcularPrecio(),
      })),
    }

    sessionStorage.setItem("datosCompra", JSON.stringify(datosCompra))

    // Mostrar sección de pago
    document.getElementById("pagoSection").style.display = "block"
    this.style.display = "none"

    // Scroll a la sección de pago
    document.getElementById("pagoSection").scrollIntoView({ behavior: "smooth" })
  } catch (error) {
    mostrarError(error.message)
  }
})

function mostrarError(mensaje) {
  const errorMessage = document.getElementById("errorMessage")
  errorMessage.textContent = mensaje
  errorMessage.classList.add("show")
  errorMessage.scrollIntoView({ behavior: "smooth" })
}

function procesarPago(metodo) {
  const datosCompra = JSON.parse(sessionStorage.getItem("datosCompra"))
  datosCompra.metodoPago = metodo === "efectivo" ? "Efectivo en Boletería" : "Mercado Pago"
  sessionStorage.setItem("datosCompra", JSON.stringify(datosCompra))

  // Redirigir según método de pago
  if (metodo === "efectivo") {
    // Si es efectivo, ir directo a email
    window.location.href = "email.html"
  } else {
    // Si es Mercado Pago, ir a página de procesamiento de pago
    window.location.href = "mercadopago.html"
  }
}
