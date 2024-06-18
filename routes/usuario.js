module.exports = (app) => {

  app.get('/cadastro', (req, res) => {
    res.render('cadastro', { validacao: {}, dadosForm: {} });
  });

  app.post('/cadastro', (req, res) => {
    let dadosForm = req.body;

    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio').notEmpty();
    req.assert('casa', 'Casa não pode ser vazio').notEmpty();

    var erro = req.validationErrors();

    if(erro){
      res.render('cadastro', {validacao: erro, dadosForm: dadosForm});
      return;

    } else {
      app.controllers.userControllers.cadastro(dadosForm);
      app.controllers.jogoControllers.gerarParamentros(dadosForm.usuario);
      res.redirect('/');
    }
  });

  app.post('/', async (req, res) => {
    let dadosForm = req.body;

    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio').notEmpty();

    var erro = req.validationErrors();

    if(erro) {
      res.render('index', {validacao: erro });
      return
    } 

    const dados = await app.controllers.userControllers.autenticar(dadosForm);

    if(dados != undefined) {
      req.session.autorizado = true;
      req.session.usuario = dados.usuario;
      req.session.casa = dados.casa;
    }

    if(req.session.autorizado) {
      res.redirect('/jogo');
    } else {
      res.render('index', {validacao: [{ msg: 'Usuário ou senha invalidos.'}]});
    }
  });

  return app;
}