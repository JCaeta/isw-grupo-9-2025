class Compra {
  constructor(usuario, fechaVisita, entradas, metodoPago) {

    if (!entradas || entradas.length === 0) {
      throw new Error("Debe seleccionar al menos una entrada");
    }
    if (entradas.length > 10) {
      throw new Error("Máximo 10 entradas por compra");
    }

    this.usuario = usuario;
    this.fechaVisita = fechaVisita;
    this.entradas = entradas;
    this.metodoPago = metodoPago;
  }

  validarFecha() {
    const diaSemana = this.fechaVisita.getDay(); // 0=domingo, 1=lunes, ...
    const festivos = [
      { dia: 25, mes: 12 },
      { dia: 1, mes: 1 }
    ];

    if (diaSemana === 1) {
      throw new Error("Parque cerrado los lunes");
    }

    const esFestivo = festivos.some(
      f =>
        f.dia === this.fechaVisita.getDate() &&
        f.mes === this.fechaVisita.getMonth() + 1
    );
    if (esFestivo) {
      throw new Error("Parque cerrado por feriado");
    }
    const hora = this.fechaVisita.getHours();
    if (hora < 9 || hora >= 19) {
      throw new Error("El parque está cerrado en ese horario (9 a 19 hs)");
    }
  }
}

module.exports = Compra;
