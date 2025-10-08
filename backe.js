// backe.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/martelogic')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Modelo da coleção "acesso"
const AcessoSchema = new mongoose.Schema({
  senha: String
});
const Acesso = mongoose.model('acesso', AcessoSchema);

// Endpoint para verificar senha
app.post('/verificar-senha', async (req, res) => {
  const { senhaDigitada } = req.body;

  try {
    const acesso = await Acesso.findOne({}); // busca o documento
    if (!acesso) return res.status(404).json({ ok: false, msg: 'Senha não encontrada no banco.' });

    if (senhaDigitada === acesso.senha) {
      return res.json({ ok: true });
    } else {
      return res.json({ ok: false, msg: 'Senha incorreta.' });
    }
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Erro no servidor.' });
  }
});

app.listen(5500, () => console.log('Servidor rodando na porta 5500'));
