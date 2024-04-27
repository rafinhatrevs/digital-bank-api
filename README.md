### digital-bank-api
Desafio DDS M02 - API Banco Digital

# API do Cubos Bank

Esta é uma API para um banco digital chamado Cubos Bank. O objetivo desta API é fornecer funcionalidades bancárias básicas, como criação de contas, transações e consultas de saldo e extrato.
Projeto desenvolvido durante a turma 16 de Desenvolvimento de Software | Back-End oferecida pela Cubos Academy.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

###  💻 Estrutura do Projeto

- **bancodedados.js:** Arquivo que contém a estrutura de dados do banco, incluindo informações como nome do banco, número da agência, e as listas de contas, saques, depósitos e transferências.
- **index.js:** Arquivo principal da aplicação que configura o servidor Express e as rotas.
- **rotas.js:** Arquivo que contém as definições das rotas da API.
  
#### controladores/:
- **contas.js:** Controlador responsável por lidar com operações relacionadas às contas bancárias, como listar, criar, atualizar e excluir contas.
- **transacoes.js:** Controlador para operações de transações bancárias, incluindo depósitos, saques e transferências.
- **consultas.js:** Controlador para consultas bancárias, como verificar saldo e extrato.
  
#### intermediários/:
- **autenticacao.js:** Intermediário para autenticar a senha do banco antes de acessar a lista de contas.
- **validacoes.js:** Intermediário para realizar validações antes de executar operações bancárias.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### ⚙️ Funcionalidades

- [x] **Listar Contas:** Endpoint para listar todas as contas bancárias cadastradas.
- [x] **Criar Conta:** Endpoint para criar uma nova conta bancária.
- [x] **Atualizar Conta:** Endpoint para atualizar informações do usuário de uma conta bancária existente.
- [x] **Excluir Conta:** Endpoint para excluir uma conta bancária.
- [x] **Depositar:** Endpoint para realizar um depósito em uma conta bancária.
- [x] **Sacar:** Endpoint para realizar um saque de uma conta bancária.
- [x] **Transferir:** Endpoint para realizar uma transferência entre contas.
- [x] **Conferir Saldo:** Endpoint para consultar o saldo de uma conta bancária.
- [x] **Extrato:** Endpoint para obter o extrato de uma conta bancária.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### ⭐ Como executar o projeto

#### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

1. [Git](https://git-scm.com)
2. [Node.js](https://nodejs.org/en/)
   
**Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).**

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone git@github.com:seu-usuario/seu-repositorio.git

# Acesse a pasta do projeto no terminal/cmd
$ cd seu-repositorio

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000

```

---

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### 🛠 Tecnologias Utilizadas

- **Node.js:** Ambiente de execução JavaScript.
- **Express.js:** Framework web para Node.js utilizado para criar a API RESTful.
- **Nodemon:** Utilitário que monitora as alterações nos arquivos e reinicia automaticamente o servidor quando necessário.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">
