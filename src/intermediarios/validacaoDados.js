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

const dadosTransacao = async (req, res, next) => {
    const { valor, numero_conta, data } = req.body;

    if (!valor || !numero_conta || !data) {
        return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });
    }

    next();
};

const dadosTransferencia = async (req, res, next) => {
    const { valor, numero_conta_origem, numero_conta_destino, data } = req.body;

    if (!valor || !numero_conta_origem || !numero_conta_destino || !data) {
        return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });
    }

    if (valor < 0) {
        return res.status(400).json({ mensagem: 'Informe um valor válido.' });
    }

    if (numero_conta_origem === numero_conta_destino) {
        return res.status(400).json({ mensagem: 'Dados inválidos. Conta de origem e destino não podem ser iguais.' });
    }

    next();
};

module.exports = {
    dadosConta,
    dadosLogin,
    dadosTransacao,
    dadosTransferencia
};