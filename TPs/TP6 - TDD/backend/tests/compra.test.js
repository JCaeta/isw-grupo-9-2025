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
});
