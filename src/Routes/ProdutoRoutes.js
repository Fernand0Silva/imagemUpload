// Routes/ProdutoRoutes.js
const express = require('express');
const { getProdutos, inserirProduto, listarProdutoPorIdHandler, atualizarProdutoHandler, deletarProduto } = require('../Controllers/ProdutoController');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/', getProdutos);
//router.post('/',inserirProduto); 
router.get('/:id', listarProdutoPorIdHandler);
router.put('/:id', atualizarProdutoHandler);
router.delete('/:id', deletarProduto);

router.post('/', upload.single('Imagem'), inserirProduto); // Adicione o middleware 

module.exports = router;

