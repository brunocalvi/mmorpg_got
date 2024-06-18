module.exports = (app) => {

  app.get('/', (req, res) => {
    res.render('index', {validacao: {}});
  });

  return app;
}