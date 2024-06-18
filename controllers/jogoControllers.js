const mongoose = require("mongoose");
const Jogo = require("../models/jogoModel");
const Acao = require("../models/acaoModel");

const jogo = mongoose.model("jogos", Jogo);
const acao = mongoose.model("acao", Acao);

class JogoController {

  async gerarParamentros(reqUsuario) {
    let newJogo = jogo({
      usuario: reqUsuario,
      moeda: 15,
      suditos: 10,
      temor: Math.floor(Math.random() * 1000),
      sabedoria: Math.floor(Math.random() * 1000),
      comercio: Math.floor(Math.random() * 1000),
      magia: Math.floor(Math.random() * 1000),
    });

    try{
      await newJogo.save();
      return true;

    }catch(e) {
      console.log(e);
      return false;

    } 
  };

  async iniciaJogo(usu) {
    try {
      return await jogo.findOne({ usuario: usu });

    } catch(e) {
      console.log(e);
      return false;
    }
  };

  async acao(dados) {
    let date = new Date();
    let tempo = null;

    switch(parseInt(dados.acao)) {
      case 1: tempo = 1 * 60 * 60000; break;
      case 2: tempo = 2 * 60 * 60000; break;
      case 3: tempo = 5 * 60 * 60000; break;
      case 4: tempo = 5 * 60 * 60000; break;
    };

    let newAcao = acao({
      usuario: dados.usuario,
      acao: dados.acao,
      quantidade: dados.quantidade,
      acao_termina_em: date.getTime() + tempo,
    });

    let moedas = null;

    switch(parseInt(dados.acao)) {
      case 1: moedas = -1 * dados.quantidade; break;
      case 2: moedas = -3 * dados.quantidade; break;
      case 3: moedas = -1 * dados.quantidade; break;
      case 4: moedas = -1 * dados.quantidade; break;
    };

    let updateJogo = await jogo.findOneAndUpdate({ usuario: dados.usuario }, { $inc: { moeda: moedas }});

    try{
      await updateJogo.save();
      await newAcao.save();
      return true;

    }catch(e) {
      console.log(e);
      return false;
    } 
  };

  async getAcoes(usuario) {
    try {
      const date = new Date();
      const momento_atual = date.getTime();

      let result = await acao.find({ usuario: usuario, acao_termina_em: {$gt: momento_atual} });

      return result;

    } catch(e) {
      console.log(e);
      return false;
    }
  };

  async revogar_acao(id) {
    try {
      return await acao.deleteOne({ _id: id });

    } catch(e) {
      console.log(e);
      return false;
    }
  };
}

module.exports = new JogoController();