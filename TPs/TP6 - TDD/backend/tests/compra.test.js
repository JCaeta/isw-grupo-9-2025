const Usuario = require("../src/models/Usuario");
const Entrada = require("../src/models/Entrada");
const Compra = require("../src/Compra");

describe("Compra de entradas - Grupo 9", () => {
    test("Test para crear una entrada", () => {
    const entrada = new Entrada(25, "VIP");
    expect(entrada).toBeInstanceOf(Entrada);
    expect(entrada.edad).toBe(25);
    expect(entrada.tipoPase).toBe("VIP");
  });

  test("Test para verificar el precio", () => {
    const entradaVipAdulto = new Entrada(25, "VIP");
    const entradaRegularNiño = new Entrada(8, "Regular");
    const entradaGratis = new Entrada(2, "Regular");
    const entradaMayor = new Entrada(65, "VIP");

    expect(entradaVipAdulto.calcularPrecio()).toBe(10000);
    expect(entradaRegularNiño.calcularPrecio()).toBe(2500); // mitad
    expect(entradaGratis.calcularPrecio()).toBe(0);
    expect(entradaMayor.calcularPrecio()).toBe(5000); // mitad del VIP
  });

  test("Test para crear una compra", () => {
  const usuario = new Usuario("Nacho", true);
  const entradas = [
    new Entrada(25, "Regular"),
    new Entrada(8, "VIP")
  ];
  const fechaVisita = new Date(2025, 10, 9, 10, 0); // Domingo 9/11/2025 - 10:00hs
  const metodoPago = "tarjeta";

  const compra = new Compra(usuario, fechaVisita, entradas, metodoPago);

  // Verificar que sea instancia de Compra
  expect(compra).toBeInstanceOf(Compra);

  // Verificar propiedades principales
  expect(compra.usuario).toBe(usuario);
  expect(compra.fechaVisita).toBe(fechaVisita);
  expect(compra.entradas).toEqual(entradas);
  expect(compra.metodoPago).toBe(metodoPago);

  // Verificar cantidad de entradas
  expect(compra.entradas.length).toBe(2);
  });

  test("No puede comprar lunes o dia festivo (día cerrado)", () => {
    const usuario = new Usuario("Nacho", true);
    const entradas = [new Entrada(30, "Regular")];
    const compra = new Compra(usuario, new Date(2025, 10, 10, 10, 0), entradas, "efectivo");
    expect(() => compra.validarFecha()).toThrow("Parque cerrado");
  });

});
