const express = require('express');
const { fazerLogin,buscarDados,getlistarDados} = require('../Controllers/LoginController');
const router = express.Router();

router.post('/', fazerLogin);
router.post('/buscarDados',buscarDados); // Nova rota
router.get('/',getlistarDados); // Nova rota

module.exports = router;