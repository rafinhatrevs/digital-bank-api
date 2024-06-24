const jwt = require('jsonwebtoken');
const config = require('../configs');

const loginBanco = async (req, res) => {
    const { numero_conta, senha } = req.body;

    if (!numero_conta || !senha) { return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' }); }

    try {
        if (numero_conta !== config.bankNumber || senha !== config.bankPassword) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
        }

        const token = jwt.sign({ isBank: true }, config.jwtSecret, { expiresIn: '1h' });

        return res.status(200).json({ token });

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = loginBanco;