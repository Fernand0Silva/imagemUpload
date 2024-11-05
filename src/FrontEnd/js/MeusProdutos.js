async function listarProdutos() {
    try {
        const response = await fetch('http://localhost:3000/Produto', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const produtos = await response.json();
            const listaProdutosDiv = document.getElementById('listarProdutos');
            listaProdutosDiv.innerHTML = ''; // Limpa a lista antes de preencher

            if (produtos.length > 0) {
                produtos.forEach(produto => {
                    const produtoDiv = document.createElement('div');
                     // A URL da imagem será o endpoint que vai servir a imagem, como discutido
                     const imagemUrl = `http://localhost:3000/uploads/${produto.Imagem}`;// A URL agora contém o nome da imagem com extensão
                    produtoDiv.innerHTML = `
                        <p><strong>ID:</strong> ${produto.Id}</p>
                        <p>Nome: ${produto.Nome}</p>
                        <p>Descrição: ${produto.Descricao}</p>
                        <p><strong>Imagem:</strong></p>
                        <img src="." alt="${produto.Nome}" width="200" />
                        <p>Preço: ${produto.Preco}</p>
                         <hr></hr>
                    `;
                    listaProdutosDiv.appendChild(produtoDiv);
                });
            } else {
                listaProdutosDiv.innerHTML = '<p>Nenhum produto cadastrado!</p>';
            }
        } else {
            alert('Erro ao buscar os produtos!');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar os produtos!');
    }
}

// Chama a função ao carregar a página
window.onload = listarProdutos;