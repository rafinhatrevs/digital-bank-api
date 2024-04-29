const express = require('express');
const autenticacao = require('./intermediarios/autenticacao');
const { validarDadosConta, validarDadosUsuario, validarDadosTransacao, validarDadosConsulta } = require('./intermediarios/validacoes');
const { listarContas, criarConta, atualizarUsuarioConta, excluirConta } = require('./controladores/contas');
const { depositar, sacar, transferir } = require('./controladores/transacoes');
const { exibirSaldo, exibirExtrato } = require('./controladores/consultas');

const rotas = express();

rotas.get('/contas', autenticacao, listarContas);
rotas.post('/contas', validarDadosUsuario, criarConta);
rotas.put('/contas/:numeroConta/usuario', validarDadosConta, validarDadosUsuario, atualizarUsuarioConta);
rotas.delete('/contas/:numeroConta', validarDadosConta, excluirConta);
rotas.post('/transacoes/depositar', validarDadosTransacao, depositar);
rotas.post('/transacoes/sacar', validarDadosTransacao, sacar);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/contas/saldo', validarDadosConsulta, exibirSaldo);
rotas.get('/contas/extrato', validarDadosConsulta, exibirExtrato);

module.exports = rotas;