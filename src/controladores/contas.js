const fs = require('fs/promises');
const bancodedados = require('../bancodedados');

const listarContas = async (req, res) => {
    const contas = bancodedados.contas;

    return res.status(200).json({ contas });
};

const criarConta = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    try {
        let ultimo_numero_conta = 0;

        if (bancodedados.contas.length > 0) {
            ultimo_numero_conta = parseInt(bancodedados.contas[bancodedados.contas.length - 1].numero_conta);
        }

        const numero_conta = ultimo_numero_conta + 1;

        const conta = {
            numero_conta: String(numero_conta),
            saldo_conta: 0,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        };

        bancodedados.contas.push(conta);

        const dados_string = `module.exports = ${JSON.stringify(bancodedados)}`;

        await fs.writeFile('./src/bancodedados.js', dados_string);

        return res.status(201).send();
    } catch (erro) {
        return res.status(500).json({ "erro": erro.message });
    }
};

const atualizarUsuarioConta = async (req, res) => {
    const conta_encontrada = req.contas;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    try {
        bancodedados.contas[conta_encontrada].usuario.nome = nome;
        bancodedados.contas[conta_encontrada].usuario.cpf = cpf;
        bancodedados.contas[conta_encontrada].usuario.data_nascimento = data_nascimento;
        bancodedados.contas[conta_encontrada].usuario.telefone = telefone;
        bancodedados.contas[conta_encontrada].usuario.email = email;
        bancodedados.contas[conta_encontrada].usuario.senha = senha;

        const dados_string = `module.exports = ${JSON.stringify(bancodedados)}`;

        await fs.writeFile('./src/bancodedados.js', dados_string);

        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ "erro": erro.message });
    }
};

const excluirConta = async (req, res) => {
    const conta_encontrada = req.contas;

    if (bancodedados.contas[conta_encontrada].saldo_conta !== 0) {
        return res.status(400).json({ "mensagem": "A conta só pode ser removida se o saldo for zero!" });
    }

    try {
        bancodedados.contas.splice(conta_encontrada, 1);

        const dados_string = `module.exports = ${JSON.stringify(bancodedados)}`;

        await fs.writeFile('./src/bancodedados.js', dados_string);

        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ "erro": erro.message });
    }
};

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuarioConta,
    excluirConta
};