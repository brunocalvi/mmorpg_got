module.exports = (app) => {

  app.get('/jogo', async (req, res) => {
    let autorizado = req.session.autorizado; 
    let usuario = req.session.usuario;
    let msg = '';

    if(autorizado !== true) {
      res.render('index', {validacao: [{ msg: 'Usuário precisa fazer login.'}]});
      return;
    }

    if(req.query.msg != '') {
      msg = req.query.msg;
    }

    const jogo = await app.controllers.jogoControllers.iniciaJogo(usuario);

    res.render('jogo', { img_casa: req.session.casa, jogo: jogo, msg: msg });
  });

  app.get('/sair', (req, res) => {
    req.session.destroy((err) => {
      res.redirect('/');
    });
  });

  app.get('/suditos', async (req, res) => {
    let usuario = req.session.usuario; 
    let autorizado = req.session.autorizado; 
    let soma = 0;
    let cheio = false;

    if(autorizado !== true) {
      res.send('<br/><h1>Usuario precisa fazer login</h1>');
      return;
    }

    const acoes = await app.controllers.jogoControllers.getAcoes(usuario);
    const dados = await app.controllers.jogoControllers.iniciaJogo(usuario);

    for(let i = 0; i < acoes.length; i++) {
      soma = soma + acoes[i].quantidade;
    }

    let restante = dados.suditos - soma;

    if(restante.toString() == 0) { cheio = true };

    res.render('aldeoes', { restante: restante, soma: soma, cheio: cheio });
  });

  app.get('/pergaminhos', async (req, res) => {
    let autorizado = req.session.autorizado; 
    let usuario = req.session.usuario; 
    
    if(autorizado !== true) {
      res.send('<br/><h1>Usuario precisa fazer login</h1>');
      return;
    }

    const acoes = await app.controllers.jogoControllers.getAcoes(usuario);

    res.render('pergaminhos', { acoes: acoes });
  });

  app.post('/ordenar_acao_sudito', async (req, res) => {
    let autorizado = req.session.autorizado;
    let usuario = req.session.usuario; 
    let dadosForm = req.body;

    dadosForm.usuario = usuario; 

    if(autorizado !== true) {
      res.send('<br/><h1>Usuario precisa fazer login</h1>');
      return;
    }

    req.assert('acao', 'Deve ter uma ação selecionada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    let erro = req.validationErrors();

    if(erro) {
      res.redirect('jogo?msg=E');
      return;
    }

    const acao = await app.controllers.jogoControllers.acao(dadosForm);

    if(acao == true) {
      res.redirect('jogo?msg=S');
    }
  });

  app.get('/revoga_acao', async (req, res) => {
    let autorizado = req.session.autorizado;
    let id_acao = req.query.id_acao;

    if(autorizado !== true) {
      res.send('<br/><h1>Usuario precisa fazer login</h1>');
      return;
    }

    const id = await app.controllers.jogoControllers.revogar_acao(id_acao);

    if(id.acknowledged == true) {
      res.redirect('jogo?msg=D');
    } else {
      res.redirect('jogo?msg=E');
    }
  });

  return app;
}