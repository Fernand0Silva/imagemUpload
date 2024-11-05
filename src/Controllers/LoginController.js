const {verificarCredenciais,buscarDadosPorTelefone,listarDados} = require('../Models/LoginModel');
const jwt = require('jsonwebtoken');

const sql = require('mssql');

async function fazerLogin(req, res) {
    const { Telefone, Senha } = req.body;

    if (!Telefone || !Senha) {
        return res.status(400).send('Telefone ou Senha ausentes');
    }

    try {
        const resultado = await verificarCredenciais(Telefone, Senha);
        
        if (resultado.auth) {
            // Armazenar o token no cookie
            res.cookie('token', resultado.token, {
                 httpOnly: true,
                 secure: false,      // Use `true` se estiver usando HTTPS
                 sameSite: 'lax',    // Controla o compartilhamento de cookies em cross-site requests
                 maxAge: 3600000     // Tempo de vida do cookie em milissegundos (1 hora aqui)
                 });// Define o cookie JWT
        //retorna o token jwt na resposta
            res.status(200).json
            ({message:'Login realizado com sucesso!',
              token: resultado.token // inclui o tiken na resposta
            });//token:resultado.token
        } else {
            res.status(401).send('Telefone ou Senha incorretos');
        }
    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).send('Erro ao fazer login');
    }
}
async function buscarDados(req, res) {
    const { telefone } = req.body;

    if (!telefone) {
        return res.status(400).json({ error: 'Telefone ausente.' });
    }

    try {
        const dados = await buscarDadosPorTelefone(telefone);
        if (dados) {
            res.status(200).json(dados); // Retorna os dados encontrados
        } else {
            res.status(404).json({ error: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar dados.' });
    }
}
//===================================


//=========
async function getlistarDados(req, res) {
        try {
            const cadastro = await listarDados();
            return res.json(cadastro);
        } catch (err) {
            console.error('Erro ao consultar cadastro:', err);
            return res.status(500).send('Erro ao consultar cadastro');
        }
    }

module.exports = { fazerLogin, buscarDados,getlistarDados,}; // Adicione buscarDados aqui
