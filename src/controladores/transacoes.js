const fs = require('fs/promises');
const bancodedados = require('../bancodedados');

const momento = async () => {
    return new Date();
};

const depositar = async (req, res) => {
    const conta_encontrada = req.contas_transacoes
    const { numero_conta, valor } = req.body;

    try {
        bancodedados.contas[conta_encontrada].saldo_conta += valor;

        const momento_agora = await momento();

        const deposito = {
            data: momento_agora,
            numero_conta,
            valor
        };

        bancodedados.depositos.push(deposito);

        const dados_string = `module.exports = ${JSON.stringify(bancodedados)}`;

        await fs.writeFile('./src/bancodedados.js', dados_string);

        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ "erro": erro.message });
    }
};

const sacar = async (req, res) => {
    const conta_encontrada = req.contas_transacoes;
    const { numero_conta, valor } = req.body;

    if (bancodedados.contas[conta_encontrada].saldo_conta <= 0 || valor > bancodedados.contas[conta_encontrada].saldo_conta) {
        return res.status(400).json({ "mensagem": "Saldo insuficiente!" });
    }

    try {
        bancodedados.contas[conta_encontrada].saldo_conta -= valor;

        const momento_agora = await momento();

        const saque = {
            data: momento_agora,
            numero_conta,
            valor
        };

        bancodedados.saques.push(saque);

        const dados_string = `module.exports = ${JSON.stringify(bancodedados)}`;

        await fs.writeFile('./src/bancodedados.js', dados_string);

        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ "erro": erro.message });
    }
};

const transferir = async (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem) { return res.status(400).json({ "mensagem": "O número da conta de origem deve ser informado." }); }
    if (!numero_conta_destino) { return res.status(400).json({ "mensagem": "O número da conta de destino deve ser informado." }); }
    if (!valor) { return res.status(400).json({ "mensagem": "O valor deve ser informado." }); }
    if (!senha) { return res.status(400).json({ "mensagem": "A senha deve ser informada." }); }

    const conta_origem = bancodedados.contas.findIndex((conta) => {
        return conta.numero_conta === numero_conta_origem;
    });

    const conta_destino = bancodedados.contas.findIndex((conta) => {
        return conta.numero_conta === numero_conta_destino;
    });

    if (conta_origem === -1) {
        return res.status(404).json({ "mensagem": "Conta bancária de origem não encontada!" });
    }

    if (conta_destino === -1) {
        return res.status(404).json({ "mensagem": "Conta bancária de destino não encontada!" });
    }

    if (conta_destino === conta_origem) {
        return res.status(400).json({ "mensagem": "Conta de destino inválida." });
    }

    if (valor < 0) {
        return res.status(400).json({ "mensagem": "O valor não pode ser menor que zero!" });
    }

    if (senha !== bancodedados.contas[conta_origem].usuario.senha) {
        return res.status(400).json({ "mensagem": "Senha incorreta." });
    }

    if (bancodedados.contas[conta_origem].saldo_conta <= 0 || valor > bancodedados.contas[conta_origem].saldo_conta) {
        return res.status(400).json({ "mensagem": "Saldo insuficiente!" });
    }

    try {
        bancodedados.contas[conta_origem].saldo_conta -= valor;
        bancodedados.contas[conta_destino].saldo_conta += valor;

        const momento_agora = await momento();

        const transferencia = {
            data: momento_agora,
            numero_conta_origem,
            numero_conta_destino,
            valor
        };

        bancodedados.transferencias.push(transferencia);

        const dados_string = `module.exports = ${JSON.stringify(bancodedados)}`;

        await fs.writeFile('./src/bancodedados.js', dados_string);

        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ "erro": erro.message });
    }
};

module.exports = {
    depositar,
    sacar,
    transferir
};