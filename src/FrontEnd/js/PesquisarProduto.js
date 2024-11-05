async function carregarProdutos() {
    const params = new URLSearchParams(window.location.search);
    const nomeProduto = params.get('nome');

    if (nomeProduto) {
        try {
            const response = await fetch(`http://localhost:3000/search?query=${nomeProduto}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const produtos = await response.json();
                const produtoDetalhesDiv = document.getElementById('produtoDetalhes');
                produtoDetalhesDiv.innerHTML = ''; // Limpa detalhes anteriores

                if (produtos.length > 0) {
                produtos.forEach(produto => {
                    const produtoDiv = document.createElement('div');
                    produtoDiv.innerHTML = `
                         <h3>${produto.Nome}</h3> 
                       <div class="produto-detalhes">
                        <p><b>Nome:</b> ${produto.Nome}</p>
                        <p><b>Descrição:</b> ${produto.Descricao}</p>
                        <p><b>Preço:</b> R$ ${produto.Preco.toFixed(2)}</p>
                         <button onclick="adicionarAoCarrinho('${produto.Nome}', '${produto.Descricao}', ${produto.Preco})">Comprar</button>
                        </div>
                        <hr></hr>
                    `;
                        produtoDetalhesDiv.appendChild(produtoDiv);
                        //window.onload = Carrinho;
                    });
                    
                } else {
                    produtoDetalhesDiv.innerText = 'Nenhum produto encontrado!';
                }
            } else {
                alert('Erro ao buscar os produtos!');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao buscar os produtos!');
        }
    } else {
        document.getElementById('produtoDetalhes').innerText = 'Nenhum produto especificado!';
    }
}

// Carregar produtos ao abrir a página
window.onload = carregarProdutos;

// Função para adicionar ao carrinho
function adicionarAoCarrinho(nome, descricao, preco) {
const produto = { nome, descricao, preco };
carrinho.push(produto);
atualizarCarrinho();
alert(`${nome} foi adicionado ao seu carrinho!`);
}
function adicionarAoCarrinho(nome, descricao, preco) {
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; // Carrega o carrinho existente
const produto = { nome, descricao, preco };
carrinho.push(produto); // Adiciona o novo produto
localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage
alert(`${nome} foi adicionado ao seu carrinho!`);
}
