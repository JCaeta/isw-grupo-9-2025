class Compra {
  constructor(usuario, fechaVisita, entradas, metodoPago) {

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
  }
}

module.exports = Compra;
