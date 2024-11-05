const { listarProdutos, criarProduto,listarProdutoPorId,atualizarProduto} = require('../Models/ProdutoModel');
const sql = require('mssql'); 
const multer = require('multer');
const path = require('path'); // Módulo path para pegar a extensão do arquivo

const storage = multer.diskStorage({ // Usar armazenamento em disco
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Pasta onde a imagem será salva
    },
    filename: (req, file, cb) => {
        const time = new Date().getTime();
        cb(null, `${time}_${file.originalname}`); // Renomeia a imagem
    }
});
const upload = multer({ storage: storage }).single('imagem'); // Espera um arquivo com o nome 'imagem'



async function getProdutos(req, res) {
    try {
        const produtos = await listarProdutos();
        return res.json(produtos);
    } catch (err) {
        console.error('Erro ao consultar produtos:', err);
        return res.status(500).send('Erro ao consultar produtos');
    }
}
/*async function inserirProduto(req, res) {
    const { Nome, Descricao, Preco } = req.body;
    const Imagem = req.file ? req.file.filename : null; // Captura o nome da imagem do req.file

    // Validação dos campos
    if (!Nome || !Descricao || !Preco || !Imagem) {
        return res.status(400).send('Nome, Descricao, Imagem ou Preço ausentes');
    }

    try {
        // Chama a função criando o produto e passando a imagem
        const produtoId = await criarProduto(Nome, Descricao, Preco, Imagem);
        res.status(200).send({ message: 'Produto inserido com sucesso!', produtoId });
    } catch (err) {
        console.error('Erro ao inserir produto:', err);
        res.status(500).send({ error: 'Erro ao inserir produto' });
    }
}*/
async function inserirProduto(req, res) {
    const { Nome, Descricao, Preco } = req.body;
    const Imagem = req.file ? req.file.filename : null; // Captura o nome do arquivo sem a extensão

    // Validação dos campos
    if (!Nome || !Descricao || !Preco || !Imagem) {
        return res.status(400).send('Nome, Descricao, Imagem ou Preço ausentes');
    }

    // Pegue a extensão do arquivo
    const fileExtension = path.extname(req.file.originalname); // Ex: .jpg, .png, etc.

    // Salve o nome do arquivo com a extensão no banco de dados
    const nomeImagemCompleto = Imagem + fileExtension; // Concatenar o nome do arquivo com a extensão

    try {
        // Chama a função criando o produto e passando a imagem com a extensão
        const produtoId = await criarProduto(Nome, Descricao, Preco, nomeImagemCompleto);
        res.status(200).send({ message: 'Produto inserido com sucesso!', produtoId });
    } catch (err) {
        console.error('Erro ao inserir produto:', err);
        res.status(500).send({ error: 'Erro ao inserir produto' });
    }
}

// Middleware para fazer upload antes de chamar a função inserirProduto
function uploadImagem(req, res, next) {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).send({ error: 'Erro ao fazer upload da imagem' });
        }
        next();
    });
}
async function listarProdutoPorIdHandler(req, res) {
    const id = parseInt(req.params.id);

    try {
        const produto = await listarProdutoPorId(id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado -_-');
        }
        res.json(produto);
    } catch (err) {
        console.error('Erro ao consultar produto:', err);
        res.status(500).send('Erro ao consultar produto');
    }
}
async function atualizarProdutoHandler(req, res) {
    const id = parseInt(req.params.id); // Pega o ID da URL
    const { Nome,Descricao,Preco,Imagem } = req.body;
    //const imagem = req.fole? req.file.path:null;


    if (!id) {
        return res.status(400).send('ID inválido');
    }

   
    if (!Nome && !Descricao && !Preco /*&& !Imagem*/) {
        return res.status(400).send('Nenhum dado para atualizar');
    }

    try {
        const rowsAffected = await atualizarProduto(id, Nome, Descricao, Preco, Imagem);
        
        if (rowsAffected === 0) {
            return res.status(404).send('Produto não encontrado');
        }

        res.send('Produto atualizado com sucesso');
    } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).send('Erro ao atualizar produto');
    }
}
const deletarProduto = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const pool = await sql.connect();
        const resultado = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM tbl_Produto WHERE Id = @id');

        
        if (resultado.rowsAffected[0] === 0) {
            return res.status(404).send('Po não encontrado');
        }

        res.status(200).send('produto deletado com sucesso!');
    } catch (err) {
        console.error('Erro ao deletar produto:', err);
        res.status(500).send('Erro ao deletar produto');
    }
};


module.exports = { getProdutos,inserirProduto, listarProdutoPorIdHandler,atualizarProdutoHandler,deletarProduto,uploadImagem };