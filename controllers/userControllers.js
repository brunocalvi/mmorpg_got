const crypto = require('crypto');
const mongoose = require("mongoose");
const User = require("../models/userModel");

const usuario = mongoose.model("usuarios", User);

class UserController {

  async cadastro(value) {

    const senhaCry = crypto.createHash('md5').update(value.senha).digest('hex');
    
    var newUse = new usuario({
      nome: value.nome,
      usuario: value.usuario,
      senha: senhaCry,
      casa: value.casa,
    });

    try{
      await newUse.save();
      return true;

    }catch(e) {
      console.log(e);
      return false;

    } 
  };

  async autenticar(value) {
    try {
      const senhaCry = crypto.createHash('md5').update(value.senha).digest('hex');

      return await usuario.findOne({ usuario: value.usuario, senha: senhaCry });

    } catch (e) {
      console.log(e);
      return false;
    }

  }

}

module.exports = new UserController();
