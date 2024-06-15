const express = require('express');

// validacoes
const validarBanco = require('./intermediarios/validacaoBanco');
const validarUsuario = require('./intermediarios/validacaoUsuario');
const { dadosConta, dadosLogin } = require('./intermediarios/validacaoDados');

// controladores
const loginBanco = require('./controladores/loginBanco');
const loginUsuario = require('./controladores/loginUsuario');
const { listarContas, criarConta, atualizarConta, excluirConta } = require('./controladores/contas');

const rotas = express();

rotas.post('/banco', loginBanco);
rotas.post('/contas', dadosConta, criarConta);
rotas.post('/login', dadosLogin, loginUsuario);
rotas.get('/contas', validarBanco, listarContas);

rotas.use(validarUsuario);

// rotas contas
rotas.put('/contas', dadosConta, atualizarConta);
rotas.delete('/contas', excluirConta);

module.exports = rotas;