const mongoose = require('mongoose');

const Acao = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  acao: {
    type: Number,
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
  },
  acao_termina_em: {
    type: String,
    required: true,
  },
});

module.exports = Acao;