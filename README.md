### digital-bank-api
Desafio DDS M02 - API Banco Digital

<p align="center">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/rafinhatrevs/digital-bank-api">
  
  <a href="https://github.com/rafinhatrevs/digital-bank-api/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/rafinhatrevs/digital-bank-api">
  </a>
  
  <a href="https://www.linkedin.com/in/rafaellatrevizan/">
    <img alt="Feito por Rafaella Trevizan" src="https://img.shields.io/badge/feito-por%20Rafaella%20Trevizan-D818A5">
  </a>

  <img alt="Status Em Desenvolvimento" src="https://img.shields.io/badge/status-EM%20DESENVOLVIMENTO-green">
</p>   

# API do Cubos Bank

Esta é uma API para um banco digital chamado Cubos Bank. O objetivo desta API é fornecer funcionalidades bancárias básicas, como criação de contas, transações e consultas de saldo e extrato.
Projeto desenvolvido durante a turma 16 de Desenvolvimento de Software | Back-End oferecida pela Cubos Academy.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

###  💻 Estrutura do Projeto

#### src/:
- **index.js:** Arquivo principal da aplicação que configura o servidor Express e as rotas.
- **rotas.js:** Arquivo que contém as definições das rotas da API.
- **conexao.js:** Arquivo de configuração da conexão com o banco de dados PostgreSQL utilizando pool de conexões.
- **configs.js:** Arquivo de configuração que armazena dados sensíveis e de configuração.
  
	#### controladores/:
	- **contas.js:** Controlador responsável por lidar com operações relacionadas às contas bancárias, como listar, criar, atualizar e excluir contas.
	- **transacoes.js:** Controlador para operações de transações bancárias, incluindo depósitos, saques e transferências.
	- **consultas.js:** Controlador para consultas bancárias, como verificar saldo e extrato.
	- **loginBanco.js:** Controlador para login do banco digital.
	- **loginUsuario.js:** Controlador para login de usuários.
	  
	#### intermediários/:
	- **validacaoBanco.js:** Intermediário para autenticar o login do banco antes de acessar a lista de contas.
	- **validacaoUsuario.js:** Intermediário para autenticar o login do usuário antes de executar operações bancárias.
	- **validacaoDados.js:** Intermediário para validação de preenchimento obrigatório de dados.

#### sql/: 
- **estrutura.sql:** Estrutura do banco de dados e suas tabelas.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### ⚙️ Funcionalidades

- **Login Banco:** `POST` `/banco`  
  Endpoint para efetuar o login do banco digital.
- **Criar Conta:**  `POST` `/contas`  
  Endpoint para criar uma nova conta bancária.
- **Login Usuário:**  `POST` `/login`  
  Endpoint para efetuar o login do usuário.
- **Listar Contas:**  `GET` `/contas`  
  Endpoint para listar todas as contas bancárias cadastradas.
- **Atualizar Conta:**  `PUT` `/contas`  
  Endpoint para atualizar informações do usuário de uma conta bancária existente.
- **Excluir Conta:**  `DELETE` `/contas`  
  Endpoint para excluir uma conta bancária.
- **Depositar:**  `POST` `/transacoes/deposito`  
  Endpoint para realizar um depósito em uma conta bancária.
- **Sacar:**  `POST` `/transacoes/saque`  
  Endpoint para realizar um saque de uma conta bancária.
- **Transferir:**  `POST` `/transacoes/transferencia`  
  Endpoint para realizar uma transferência entre contas.
- **Saldo:**  `GET` `/contas/saldo`  
  Endpoint para consultar o saldo de uma conta bancária.
- **Extrato:**  `GET` `/contas/extrato`  
  Endpoint para obter o extrato de uma conta bancária.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### ⭐ Como executar o projeto

#### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

1. [Git](https://git-scm.com)
2. [Node.js](https://nodejs.org/en/)
3. [PostgreSQL](https://www.postgresql.org/)
   
**Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).**

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone git@github.com:rafinhatrevs/digital-bank-api.git

# Acesse a pasta do projeto no terminal/cmd
$ cd digital-bank-api

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000

```

<p align="center">
  <a href="https://insomnia.rest/run/?label=&uri=https%3A%2F%2Fraw.githubusercontent.com%2Frafinhatrevs%2Fdigital-bank-api-insomnia%2Fmain%2FInsomnia_2024-06-23.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

#### Exemplos de requisições (Body JSON)

```javascript

// POST /banco
{
	"numero_conta": "123",
	"senha": "123"
}

```

```javascript

// POST /login
{
	"cpf": "12345678911",
	"senha": "123456"
}

```

```javascript

// POST /contas
{
	"nome": "nome",
   	"cpf": "12345678911",
    	"data_nascimento": "2000-02-02",
    	"telefone": "99999999999",
    	"email": "nome@email.com",
    	"senha": "123456"
}

```

```javascript

// PUT /contas
{
	"nome": "nome",
   	"cpf": "12345678911",
    	"data_nascimento": "2000-02-02",
    	"telefone": "99999999999",
    	"email": "nome@email.com",
    	"senha": "123456"
}

```

```javascript

// POST /transacoes/deposito
{
	"valor": 100000,
	"numero_conta": 1,
	"data": "2024-06-17"
}

```

```javascript

// POST /transacoes/saque
{
	"valor": 100000,
	"numero_conta": 1,
	"data": "2024-06-17"
}

```

```javascript

// POST /transacoes/transferencia
{
	"valor": 10000,
	"numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"data": "2024-06-17"
}

```


<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### 🛠 Tecnologias Utilizadas

- **Node.js:** Ambiente de execução JavaScript.
- **Express.js:** Framework web para Node.js utilizado para criar a API RESTful.
- **Nodemon:** Utilitário que monitora as alterações nos arquivos e reinicia automaticamente o servidor quando necessário.
- **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional open-source.
- **bcrypt:** Função de hashing criptográfico utilizada para armazenar senhas de forma segura em bancos de dados.
- **jsonwebtoken:** Implementação de tokens JWT (JSON Web Tokens) para autenticação segura entre partes.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`.
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`.
4. Envie as suas alterações: `git push origin my-feature`.
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://docs.github.com/pt/get-started/exploring-projects-on-github/contributing-to-a-project).

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

###  🔑 Licença

Este projeto é licenciado por [MIT](https://opensource.org/license/mit).

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

**Feito com 💜 por Rafaella Trevizan [Entre em contato!](https://www.linkedin.com/in/rafaellatrevizan/)**
