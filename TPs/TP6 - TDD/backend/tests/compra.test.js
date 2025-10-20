const { mockUsers, mockEntradas, mockCompras } = require('../src/mocks/mockData');
const Usuario = require("../src/models/Usuario");
const Entrada = require("../src/models/Entrada");
const Compra = require("../src/Compra");

jest.mock('../src/emailService', () => ({
  enviarEmailConfirmacion: jest.fn().mockResolvedValue({ 
    messageId: 'test-message-id',
    accepted: ['test@email.com']
  })
}));

describe("Compra de entradas - Grupo 9", () => {
    beforeEach(() => {
        mockCompras.length = 0; // Reset mock data
    });
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

  test("No puede comprar fuera del horario permitido (antes de 9:00 o después de 19:00)", () => {
  const usuario = new Usuario("Nacho", true);
  const entradas = [new Entrada(30, "Regular")];
  const casos = [
    ["antes de las 9:00 hs", 8, 30],
    ["después de las 19:00 hs", 19, 15]
  ];

  casos.forEach(([descripcion, hora, minuto]) => {
    const fecha = new Date(2025, 10, 9, hora, minuto);
    const compra = new Compra(usuario, fecha, entradas, "tarjeta");

    expect(() => compra.validarFecha()).toThrow("cerrado en ese horario");
    });
  });

  test("No puede comprar más de 10 entradas", () => {
    const usuario = new Usuario("Nacho", true);
    const entradas = Array(11).fill(new Entrada(20, "Regular"));
    expect(() => new Compra(usuario, new Date(2025, 10, 8, 10, 0), entradas, "tarjeta"))
      .toThrow("Máximo 10");
  });

  test("Usuario no registrado", () => {
    const usuario = new Usuario("Invitado", false);
    const entradas = [new Entrada(20, "Regular")];
    expect(() => new Compra(usuario, new Date(2025, 10, 8, 10, 0), entradas, "efectivo"))
      .toThrow("registrado");
  });
  
  test("Pago en efectivo muestra mensaje de boletería y envía email", async () => {
    const usuario = new Usuario("Nacho", true);
    const entradas = [new Entrada(25, "Regular")];
    const compra = new Compra(usuario, new Date(2025, 10, 9, 10, 0), entradas, "efectivo");
    
    const result = await compra.confirmarCompra(); 
    expect(result.mensaje).toMatch(/Pague en boletería/);
    });

  test("Mensaje de confirmación incluye cantidad y fecha y envía email", async () => {
    const usuario = new Usuario("Nacho", true);
    const entradas = [
      new Entrada(30, "VIP"),
      new Entrada(7, "Regular")
    ];
    const compra = new Compra(usuario, new Date(2025, 10, 9, 10, 0), entradas, "tarjeta");
    
    const result = await compra.confirmarCompra();
    expect(result.mensaje).toContain("Compra confirmada");
    expect(result.redirigido_a).toBe("Mercado Pago");
  });
});
