const bancodedados = require('../bancodedados');

const exibirSaldo = async (req, res) => {
    const conta_encontrada = req.contas_consultas;

    const saldo_conta = bancodedados.contas[conta_encontrada].saldo_conta;

    return res.status(200).json({ saldo_conta });
};

const exibirExtrato = async (req, res) => {
    const { numero_conta } = req.query;

    const depositos = bancodedados.depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta;
    });

    const saques = bancodedados.saques.filter((saque) => {
        return saque.numero_conta === numero_conta;
    });

    const transferencias_enviadas = bancodedados.transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numero_conta;
    });

    const transferencias_recebidas = bancodedados.transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numero_conta;
    });

    const extrato = {
        depositos,
        saques,
        transferencias_enviadas,
        transferencias_recebidas
    };

    return res.status(200).json({ extrato });
};

module.exports = {
    exibirSaldo,
    exibirExtrato
};