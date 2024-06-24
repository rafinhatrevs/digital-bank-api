const pool = require('../conexao');

const depositar = async (req, res) => {
    const { valor, numero_conta, data } = req.body;

    try {
        const { rows, rowCount } = await pool.query(`SELECT * FROM contas WHERE id = $1`, [numero_conta]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Conta não encontrada.' });
        }

        const conta = rows[0];

        await pool.query(`INSERT INTO depositos (valor, conta_id, data) VALUES ($1, $2, $3) RETURNING *`, [valor, numero_conta, data]);

        const novoSaldo = conta.saldo + valor;

        await pool.query(`UPDATE contas SET saldo = $1 WHERE id = $2`, [novoSaldo, numero_conta]);

        return res.status(201).send();

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const sacar = async (req, res) => {
    const { valor, numero_conta, data } = req.body;

    try {
        const { rows, rowCount } = await pool.query(`SELECT * FROM contas WHERE id = $1`, [numero_conta]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Conta não encontrada.' });
        }

        const conta = rows[0];

        const idConta = req.conta.id;

        if (conta.id !== idConta) {
            return res.status(401).json({ mensagem: 'Conta não pertence ao usuário logado.' });
        }

        await pool.query(`INSERT INTO saques (valor, conta_id, data) VALUES ($1, $2, $3) RETURNING *`, [valor, numero_conta, data]);

        const novoSaldo = conta.saldo - valor;

        await pool.query(`UPDATE contas SET saldo = $1 WHERE id = $2`, [novoSaldo, numero_conta]);

        return res.status(204).send();

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const transferir = async (req, res) => {
    const { valor, numero_conta_origem, numero_conta_destino, data } = req.body;

    try {
        const resultadoOrigem = await pool.query(`SELECT * FROM contas WHERE id = $1`, [numero_conta_origem]);
        const contaOrigem = resultadoOrigem.rows[0];

        if (!contaOrigem) {
            return res.status(404).json({ mensagem: 'Conta não encontrada.' });
        }

        const resultadoDestino = await pool.query(`SELECT * FROM contas WHERE id = $1`, [numero_conta_destino]);
        const contaDestino = resultadoDestino.rows[0];

        if (!contaDestino) {
            return res.status(404).json({ mensagem: 'Conta não encontrada.' });
        }

        const idConta = req.conta.id;

        if (contaOrigem.id !== idConta) {
            return res.status(401).json({ mensagem: 'Conta não pertence ao usuário logado.' });
        }

        if (contaOrigem.saldo === 0 || valor > contaOrigem.saldo) {
            return res.status(400).json({ mensagem: 'Saldo insuficiente!' });
        }

        await pool.query(`INSERT INTO transferencias (valor, conta_origem_id, conta_destino_id, data) VALUES ($1, $2, $3, $4) RETURNING *`,
            [valor, numero_conta_origem, numero_conta_destino, data]);

        const saldoOrigem = contaOrigem.saldo - valor;

        await pool.query(`UPDATE contas SET saldo = $1 WHERE id = $2`, [saldoOrigem, numero_conta_origem]);

        const saldoDestino = contaDestino.saldo + valor;

        await pool.query(`UPDATE contas SET saldo = $1 WHERE id = $2`, [saldoDestino, numero_conta_destino]);

        return res.status(204).send();

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    depositar,
    sacar,
    transferir
};