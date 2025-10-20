class Entrada {
  constructor(edad, tipoPase) {
    this.edad = edad;
    this.tipoPase = tipoPase;
  }
  
  calcularPrecio() {
    const preciosBase = {
      VIP: 10000,
      Regular: 5000
    };
    const base = preciosBase[this.tipoPase] || 0;

    if (this.edad < 3) return 0;
    if (this.edad < 10) return base / 2;
    if (this.edad >= 60) return base / 2;
    return base;
  }
}

module.exports = Entrada;
