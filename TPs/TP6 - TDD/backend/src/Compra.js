const { enviarEmailConfirmacion } = require("./emailService.js");

const MAX_ENTRADAS = 10;

class Compra {
  constructor(usuario, fechaVisita, entradas, metodoPago) {
    if (!usuario?.registrado) {
      throw new Error('El usuario debe estar registrado');
    }

    if (!entradas || entradas.length === 0) {
      throw new Error('Debe seleccionar al menos una entrada');
    }

    if (entradas.length > MAX_ENTRADAS) {
      throw new Error('Máximo 10 entradas por compra');
    }

    this.usuario = usuario;
    this.fechaVisita = fechaVisita;
    this.entradas = entradas;
    this.metodoPago = metodoPago;
  }

  validarFecha() {
    const diaSemana = this.fechaVisita.getDay(); // 0 = domingo, 1 = lunes, ...
    const festivos = [
      { dia: 25, mes: 12 },
      { dia: 1, mes: 1 },
    ];

    if (diaSemana === 1) {
      throw new Error('Parque cerrado los lunes');
    }

    const esFestivo = festivos.some(
      (f) =>
        f.dia === this.fechaVisita.getDate()
        && f.mes === this.fechaVisita.getMonth() + 1,
    );

    if (esFestivo) {
      throw new Error('Parque cerrado por feriado');
    }

    const hora = this.fechaVisita.getHours();
    if (hora < 9 || hora >= 19) {
      throw new Error('El parque está cerrado en ese horario (9:00 a 19:00)');
    }
  }

  calcularTotal() {
    this.validarFecha();
    return this.entradas.reduce((acc, e) => acc + e.calcularPrecio(), 0);
  }

  async confirmarCompra() {
    this.validarFecha();

    const total = this.calcularTotal();
    const cantidad = this.entradas.length;
    const fecha = this.fechaVisita.toISOString().split('T')[0];
    const mensajeBase = `Has comprado ${cantidad} entradas para el día ${fecha}. Total: $${total}.`;

    let respuesta = {};

    if (this.metodoPago === 'tarjeta') {
      respuesta = {
        mensaje: 'Compra confirmada',
        redirigidoA: 'Mercado Pago',
        total,
      };
    } else if (this.metodoPago === 'efectivo') {
      respuesta = {
        mensaje: `Pague en boletería. ${mensajeBase}`,
        total,
      };
    } else {
      throw new Error('Debe seleccionar un método de pago válido');
    }

    const info = await enviarEmailConfirmacion(
      `${this.usuario.nombre}@gmail.com`,
      'Confirmación de compra - EcoHarmony Park',
      `${mensajeBase}\nMétodo de pago: ${this.metodoPago}`,
    );

    respuesta.emailEnviado = info?.response || info?.accepted || 'No info';
    return respuesta;
  }
}

module.exports = Compra;
