const express = require('express'); 
const cors = require('cors'); 
const { Compra } = require('./Compra'); 
const { Usuario } = require('./models/Usuario'); 
const { Entrada } = require('./models/Entrada');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.post('/api/compras', async (req, res) => {
  try {
    const { usuario, fechaVisita, entradas, metodoPago } = req.body;
    const compra = new Compra(
      new Usuario(usuario.nombre, usuario.registrado),
      new Date(fechaVisita),
      entradas.map((e) => new Entrada(e.edad, e.tipoPase)),
      metodoPago,
    );

    const resultado = await compra.confirmarCompra();
    res.json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
