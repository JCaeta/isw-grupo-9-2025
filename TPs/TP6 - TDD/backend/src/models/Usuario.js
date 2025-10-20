class Usuario {
  constructor(nombre, registrado = false) {
    this.nombre = nombre;
    this.registrado = registrado;
  }
}

module.exports = Usuario;
