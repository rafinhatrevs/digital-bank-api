const dadosConta = async (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });
    }

    next();
};

const dadosLogin = async (req, res, next) => {
    const { cpf, senha } = req.body;

    if (!cpf || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });
    }

    next();
};

const dadosDeposito = async (req, res, next) => {
    const { valor, numero_conta, data } = req.body;

    if (!valor || !numero_conta || !data) {
        return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });
    }

    next();
};

module.exports = {
    dadosConta,
    dadosLogin,
    dadosDeposito
};