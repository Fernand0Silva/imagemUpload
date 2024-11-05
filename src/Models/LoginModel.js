const { sql } = require('../Database/BdConfig');
const jwt = require('jsonwebtoken');

async function verificarCredenciais(Telefone, Senha) {
    const pool = await sql.connect();
    
    const resultado = await pool.request()
        .input('Telefone', sql.NVarChar, Telefone)
        .input('Senha', sql.NVarChar, Senha)
        .query('SELECT * FROM tbl_Cadastro WHERE Telefone = @Telefone AND Senha = @Senha');

    if (resultado.recordset.length > 0) {
// Retorna verdadeiro se houver um registro correspondente
        const user = resultado.recordset[0];

        //gerar o token jwt
        const token = jwt.sign(
            { id:user.id, Telefone:user.Telefone},//Payload
            'secreta_key',//Chave secreta
            {expiresIn: '1h'}//Expiração do token
        );

        return{auth:true,token};//retorna token se credenciais corretas
    } else{
        return{auth:false,message: 'Credenciais inválidas'};
    } 
}
async function buscarDadosPorTelefone(telefone) {
    const pool = await sql.connect();
    
    const resultado = await pool.request()
        .input('telefone', sql.NVarChar, telefone)
        .query('SELECT * FROM tbl_Cadastro WHERE Telefone = @telefone');

    if (resultado.recordset.length > 0) {
        return resultado.recordset[0]; // Retorna o primeiro registro encontrado
    } else {
        throw new Error('Usuário não encontrado');
    }
}
async function listarDados() {
    const pool = await sql.connect();
    const data = await pool.request().query('SELECT * FROM tbl_Cadastro');
    return data.recordset;
}




module.exports = { verificarCredenciais, buscarDadosPorTelefone,listarDados};

