class Entrada {
  constructor(edad, tipoPase) {
    this.edad = edad
    this.tipoPase = tipoPase
  }

  calcularPrecio() {
    const preciosBase = {
      VIP: 10000,
      Regular: 5000,
    }
    const base = preciosBase[this.tipoPase] || 0

    // Menores de 3 años: gratis
    if (this.edad < 3) return 0

    // Menores de 10 años: mitad del precio
    if (this.edad < 10) return base / 2

    // Mayores de 60 años: mitad del precio
    if (this.edad >= 60) return base / 2

    // Precio completo para adultos
    return base
  }
}

// Hacer disponible globalmente para el navegador
if (typeof window !== "undefined") {
  window.Entrada = Entrada
}
