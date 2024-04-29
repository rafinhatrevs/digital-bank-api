const bancodedados = require('../bancodedados');

const validarDadosConta = async (req, res, next) => {
    const { numeroConta } = req.params;

    if (isNaN(numeroConta) || numeroConta <= 0) {
        return res.status(400).json({ "mensagem": "O número da conta informado é inválido." });
    }

    const conta_encontrada = bancodedados.contas.findIndex((conta) => {
        return conta.numero_conta === numeroConta;
    });

    if (conta_encontrada === -1) {
        return res.status(404).json({ "mensagem": "Conta bancária não encontada!" });
    }

    req.contas = conta_encontrada;

    next();
};

const validarDadosUsuario = async (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome) { return res.status(400).json({ "mensagem": "O nome deve ser informado." }); }
    if (!cpf) { return res.status(400).json({ "mensagem": "O cpf deve ser informado." }); }
    if (!data_nascimento) { return res.status(400).json({ "mensagem": "A data de nascimento deve ser informada." }); }
    if (!telefone) { return res.status(400).json({ "mensagem": "O telefone deve ser informado." }); }
    if (!email) { return res.status(400).json({ "mensagem": "O email deve ser informado." }); }
    if (!senha) { return res.status(400).json({ "mensagem": "A senha deve ser informada." }); }

    if (cpf.length !== 11) { return res.status(400).json({ "mensagem": "Informe um cpf válido." }); }
    if (telefone.length !== 11) { return res.status(400).json({ "mensagem": "Informe um telefone válido." }); }
    if (!email.includes("@") || !email.includes(".") || email.indexOf(".") === 0 || email.lastIndexOf(".") === email.length - 1) { return res.status(400).json({ "mensagem": "Informe um email válido." }); }
    if (senha.length !== 6) { return res.status(400).json({ "mensagem": "Informe uma senha válida (6 dígitos)." }); }

    const cpf_encontrado = bancodedados.contas.find((conta) => {
        return conta.usuario.cpf === cpf;
    });

    const email_encontrado = bancodedados.contas.find((conta) => {
        return conta.usuario.email === email;
    });


    if (cpf_encontrado) {
        return res.status(400).json({ "mensagem": "Já existe uma conta com o cpf informado!" });
    }

    if (email_encontrado) {
        return res.status(400).json({ "mensagem": "Já existe uma conta com o email informado!" });
    }

    next();
};

const validarDadosTransacao = async (req, res, next) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta) { return res.status(400).json({ "mensagem": "O número da conta deve ser informado." }); }
    if (!valor) { return res.status(400).json({ "mensagem": "O valor deve ser informado." }); }
    if (!senha) { return res.status(400).json({ "mensagem": "A senha deve ser informada." }); }

    const conta_encontrada = bancodedados.contas.findIndex((conta) => {
        return conta.numero_conta === numero_conta;
    });

    if (conta_encontrada === -1) {
        return res.status(404).json({ "mensagem": "Conta bancária não encontada!" });
    }

    if (valor <= 0) {
        return res.status(400).json({ "mensagem": "Não são permitidos valores negativos ou zerados." });
    }

    if (senha !== bancodedados.contas[conta_encontrada].usuario.senha) {
        return res.status(400).json({ "mensagem": "Senha incorreta." });
    }

    req.contas_transacoes = conta_encontrada;

    next();
};

const validarDadosConsulta = async (req, res, next) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta) { return res.status(400).json({ "mensagem": "O número da conta deve ser informado." }); }
    if (!senha) { return res.status(400).json({ "mensagem": "A senha deve ser informada." }); }

    const conta_encontrada = bancodedados.contas.findIndex((conta) => {
        return conta.numero_conta === numero_conta;
    });

    if (conta_encontrada === -1) {
        return res.status(404).json({ "mensagem": "Conta bancária não encontada!" });
    }

    if (senha !== bancodedados.contas[conta_encontrada].usuario.senha) {
        return res.status(400).json({ "mensagem": "Senha incorreta." });
    }

    req.contas_consultas = conta_encontrada;

    next();
};

module.exports = {
    validarDadosConta,
    validarDadosUsuario,
    validarDadosTransacao,
    validarDadosConsulta
};