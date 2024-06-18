const mongoose = require('mongoose');

const Jogo = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  moeda: {
    type: Number,
    default: 15,
  },
  suditos: {
    type: Number,
    default: 10,
  },
  temor: {
    type: Number,
    required: true,
  },
  sabedoria: {
    type: Number,
    required: true,
  },
  comercio: {
    type: Number,
    required: true,
  },
  magia: {
    type: Number,
    required: true,
  },
});

module.exports = Jogo;