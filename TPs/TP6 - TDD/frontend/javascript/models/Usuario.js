class Usuario {
  constructor(nombre, registrado = false) {
    this.nombre = nombre
    this.registrado = registrado
  }
}

// Hacer disponible globalmente para el navegador
if (typeof window !== "undefined") {
  window.Usuario = Usuario
}
