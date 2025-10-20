//const Usuario = require("../src/models/Usuario");
const Entrada = require("../src/models/Entrada");
//const Compra = require("../src/Compra");

describe("Compra de entradas - Grupo 9", () => {
    test("Test para crear una entrada", () => {
    const entrada = new Entrada(25, "VIP");
    expect(entrada).toBeInstanceOf(Entrada);
    expect(entrada.edad).toBe(25);
    expect(entrada.tipoPase).toBe("VIP");
  });
});
