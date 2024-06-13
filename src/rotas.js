const express = require('express');
const autenticacao = require('./intermediarios/autenticacao');
const { login } = require('./controladores/login');

const { listarContas, criarConta } = require('./controladores/contas');

const rotas = express();

rotas.post('/contas', criarConta);
rotas.post('/login', login);

rotas.use(autenticacao);

rotas.get('/contas', listarContas);


module.exports = rotas;