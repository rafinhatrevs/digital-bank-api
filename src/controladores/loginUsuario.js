const pool = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../configs');

const loginUsuario = async (req, res) => {
    const { cpf, senha } = req.body;

    try {
        const { rows, rowCount } = await pool.query(`SELECT * FROM contas WHERE cpf = $1`, [cpf]);

        if (rowCount === 0) {
            return res.status(400).json({ mensagem: 'Dados inválidos.' });
        }

        const senhaValida = await bcrypt.compare(senha, rows[0].senha);

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Dados inválidos.' });
        }

        const token = jwt.sign({ id: rows[0].id }, config.jwtSecret, { expiresIn: '8h' });

        const conta = {
            id: rows[0].id,
            nome: rows[0].nome,
            cpf: rows[0].cpf,
            data_nascimento: rows[0].data_nascimento,
            telefone: rows[0].telefone,
            email: rows[0].email
        };

        return res.status(200).json({ conta, token });
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = loginUsuario;
