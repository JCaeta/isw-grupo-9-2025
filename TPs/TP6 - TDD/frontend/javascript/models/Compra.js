class Compra {
  constructor(usuario, fechaVisita, entradas, metodoPago) {
    if (!usuario?.registrado) {
      throw new Error("El usuario debe estar registrado")
    }
    if (!entradas || entradas.length === 0) {
      throw new Error("Debe seleccionar al menos una entrada")
    }
    if (entradas.length > 10) {
      throw new Error("Máximo 10 entradas por compra")
    }

    this.usuario = usuario
    this.fechaVisita = fechaVisita
    this.entradas = entradas
    this.metodoPago = metodoPago
  }

  validarFecha() {
    const diaSemana = this.fechaVisita.getDay() // 0=domingo, 1=lunes, ...
    const festivos = [
      { dia: 25, mes: 12 },
      { dia: 1, mes: 1 },
    ]

    // Validar que no sea lunes
    if (diaSemana === 1) {
      throw new Error("Parque cerrado los lunes")
    }

    // Validar días festivos
    const esFestivo = festivos.some(
      (f) => f.dia === this.fechaVisita.getDate() && f.mes === this.fechaVisita.getMonth() + 1,
    )
    if (esFestivo) {
      throw new Error("Parque cerrado por feriado")
    }

    // Validar horario (9:00 - 19:00)
    const hora = this.fechaVisita.getHours()
    if (hora < 9 || hora >= 19) {
      throw new Error("El parque está cerrado en ese horario (Abierto 9 a 19 hs)")
    }
  }

  calcularTotal() {
    this.validarFecha()
    return this.entradas.reduce((acc, e) => acc + e.calcularPrecio(), 0)
  }

  async confirmarCompra() {
    this.validarFecha()
    const total = this.calcularTotal()
    const cantidad = this.entradas.length
    const fecha = this.fechaVisita.toISOString().split("T")[0]
    const mensajeBase = `Has comprado ${cantidad} entradas para el día ${fecha}. Total: $${total}.`

    let respuesta = {}

    if (this.metodoPago === "tarjeta") {
      respuesta = {
        mensaje: "Compra confirmada",
        redirigido_a: "Mercado Pago",
        total,
      }
    } else if (this.metodoPago === "efectivo") {
      respuesta = {
        mensaje: `Pague en boletería. ${mensajeBase}`,
        total,
      }
    } else {
      throw new Error("Debe seleccionar un método de pago válido")
    }

    // Simular envío de email (en el navegador no podemos usar nodemailer)
    respuesta.emailEnviado = "Simulado - Email enviado correctamente"

    return respuesta
  }
}

// Hacer disponible globalmente para el navegador
if (typeof window !== "undefined") {
  window.Compra = Compra
}
