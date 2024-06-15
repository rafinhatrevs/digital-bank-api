const pool = require('../conexao');
const bcrypt = require('bcrypt');

const listarContas = async (req, res) => {
    try {
        const { rows } = await pool.query(`SELECT id, nome, cpf, data_nascimento, telefone, email, saldo FROM contas`);

        const contas = rows;

        return res.status(200).json(contas);
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const criarConta = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    try {
        const { rowCount } = await pool.query(`SELECT * FROM contas WHERE cpf = $1 OR email = $2`, [cpf, email]);

        if (rowCount > 0) {
            return res.status(400).json({ mensagem: 'Já existe uma conta com os dados informados.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await pool.query(`INSERT INTO contas (nome, cpf, data_nascimento, telefone, email, senha)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [nome, cpf, data_nascimento, telefone, email, senhaCriptografada]);

        return res.status(201).send();
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const atualizarConta = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    try {
        const { rowCount } = await pool.query(`SELECT * FROM contas WHERE cpf = $1 OR email = $2`, [cpf, email]);

        if (rowCount > 0) {
            return res.status(400).json({ mensagem: 'Já existe uma conta com os dados informados.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await pool.query(`UPDATE contas SET nome = $1, cpf = $2, data_nascimento = $3, telefone = $4, email = $5, senha = $6
            WHERE id = $7`, [nome, cpf, data_nascimento, telefone, email, senhaCriptografada, req.conta.id]);

        return res.status(204).send();
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const excluirConta = async (req, res) => {
    try {
        const { rows, rowCount } = await pool.query(`SELECT * FROM contas WHERE id = $1`, [req.conta.id]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Conta não encontrada.' });
        }

        const conta = rows[0];

        if (conta.saldo !== 0) {
            return res.status(400).json({ mensagem: 'Saldo da conta deve estar zerado!' });
        }

        await pool.query(`DELETE FROM contas WHERE id = $1`, [req.conta.id]);

        return res.status(204).send();
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    excluirConta
};