const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/fotos', express.static(path.join(__dirname, 'public', 'jogadores')));

let cache = null;

app.get('/api/jogadores/perfis', async (req, res) => {
  if (cache) {
    return res.json(cache);
  }

  try {
    const respostaPython = await axios.get(
      'http://127.0.0.1:8000/api/jogadores/perfis',
      { timeout: 5000 }
    );

    cache = respostaPython.data;

    res.json(cache);
  } catch (erro) {
    res.status(500).json({
      erro: 'Falha no motor de ML',
      detalhe: erro.message
    });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor Node rodando na porta 3000');
});