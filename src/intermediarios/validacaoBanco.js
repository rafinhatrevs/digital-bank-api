const jwt = require('jsonwebtoken');
const config = require('../configs');

const validarBanco = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { isBank } = jwt.verify(token, config.jwtSecret);

        if (!isBank) {
            return res.status(401).json({ mensagem: 'Acesso negado. Esse recurso é restrito ao banco.' });
        }

        next();
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = validarBanco;