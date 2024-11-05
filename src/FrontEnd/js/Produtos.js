let debounceTimeout;

        // Função para listar produtos quando a página carrega
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

        // Carregar produtos ao abrir a página
        window.onload = listarProdutos;
        
        // Função para buscar produtos quando o formulário for enviado
        async function buscarProdutos(event) {
            event.preventDefault(); // Previne o comportamento padrão do form (recarregar a página)
            const searchQuery = document.getElementById('searchQuery').value; // Pegamos o valor digitado
                 
            if (!searchQuery) {
                alert('Digite algo para pesquisar!');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/search?query=${searchQuery}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    
                });

                if (response.ok) {
                    const produtos = await response.json();
                    const resultsDiv = document.getElementById('results');
                    resultsDiv.innerHTML = ''; // Limpa os resultados anteriores
                    // window.location.href = 'ProdutosPesquisados.html';
                    const listaProdutosDiv = document.getElementById('listarProdutos');
                   
                    if (produtos.length > 0) {
                        const produto = produtos[0]; // Pega o primeiro produto encontrado
                window.location.href = `PesquisarProduto.html?nome=${encodeURIComponent(produto.Nome)}`;
          
                        produtos.forEach(produto => {
                            const produtoDiv = document.createElement('div');
                            produtoDiv.innerHTML = `
                                <h3>${produto.Nome}</h3>
                                <div class="produto-detalhesPesquisado">
                                    <p><b>Nome:</b> ${produto.Nome}</p>
                                    <p><b>Descrição:</b> ${produto.Descricao}</p>
                                    <p><b>Preço:</b> R$ ${produto.Preco.toFixed(2)}</p>
                                    <button>Comprar</button>
                                    <button>Cancelar</button>
                                </div>
                                <hr />
                            `;
                            resultsDiv.appendChild(produtoDiv);
                           // window.location.href = 'ProdutosPesquisados.html';
                        });
                    } else {
                        resultsDiv.innerHTML = '<p>Nenhum produto encontrado!</p>';
                    }
                } else {
                    alert('Erro ao buscar os produtos!');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao buscar os produtos!');
            }
        }

        // Adicionar evento ao formulário de pesquisa
        const searchForm = document.getElementById('searchForm');
        searchForm.addEventListener('submit', buscarProdutos);
       
        // Carrinho
//let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para atualizar o localStorage
//function atualizarCarrinho() {
  //  localStorage.setItem('carrinho', JSON.stringify(carrinho));
//}

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
