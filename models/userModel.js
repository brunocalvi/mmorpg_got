const mongoose = require('mongoose');

const User = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true 
  },
  usuario: { 
    type: String, 
    required: true,
    unique: true 
  },
  senha: { 
    type: String, 
    required: true 
  },
  casa: { 
    type: String, 
    required: true 
  },
});

module.exports = User;