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

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });
    }

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
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

/*const atualizarUsuarioConta = async (req, res) => {
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
};*/

module.exports = {
    listarContas,
    criarConta,
};