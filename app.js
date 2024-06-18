const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const expressValidator = require('express-validator');
const expressSession = require('express-session');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(expressSession({
  secret: '/^[^@]+@[^@]+\.[^@]+$/',
  resave: false,
  SaveUninitialized: false,
}));

consign()
  .include('database/dbConnection.js')
  .then('controllers')
  .then('routes')
  .then('models') 
  .into(app);

app.listen(3000, () => {
  console.log('-> Servidor rodando na porta 3000');
});