const pool = require('../conexao');

const saldo = async (req, res) => {
    try {
        const idConta = req.conta.id;

        const { rows } = await pool.query(`SELECT saldo FROM contas WHERE id = $1`, [idConta]);

        const saldo = rows[0];

        return res.status(200).json(saldo);

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const extrato = async (req, res) => {
    try {
        const idConta = req.conta.id;

        const { rows: depositos } = await pool.query(`SELECT valor, conta_id AS numero_conta, data FROM depositos WHERE conta_id = $1`, [idConta]);
        const { rows: saques } = await pool.query(`SELECT valor, conta_id AS numero_conta, data FROM saques WHERE conta_id = $1`, [idConta]);
        const { rows: transferenciasEnviadas } = await pool.query(`
            SELECT 
                valor, 
                conta_origem_id AS numero_conta_origem,  
                conta_destino_id AS numero_conta_destino,
                data
            FROM 
                transferencias 
            WHERE 
                conta_origem_id = $1`, [idConta]);
        const { rows: transferenciasRecebidas } = await pool.query(`
            SELECT 
                valor, 
                conta_origem_id AS numero_conta_origem,  
                conta_destino_id AS numero_conta_destino,
                data
            FROM 
                transferencias 
            WHERE 
                conta_destino_id = $1`, [idConta]);

        const extrato = {
            depositos,
            saques,
            transferencias_enviadas: transferenciasEnviadas,
            transferencias_recebidas: transferenciasRecebidas
        };

        return res.status(200).json(extrato);

    } catch (error) {
        //console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    saldo,
    extrato
};