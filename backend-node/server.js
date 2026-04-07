const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/fotos', express.static(path.join(__dirname, 'public', 'jogadores')));

app.get('/api/jogadores/perfis', async (req, res) => {
  try {
    const respostaPython = await axios.get('http://127.0.0.1:8000/api/jogadores/perfis');
    res.json(respostaPython.data);
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no motor de ML' });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor Node rodando na porta 3000');
});