   // Função para carregar produtos do carrinho
   function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoItemsDiv = document.getElementById('carrinhoItems');
    carrinhoItemsDiv.innerHTML = ''; // Limpa a lista anterior

    if (carrinho.length > 0) {
        let valorTotal = 0;
        carrinho.forEach((produto, index) => {
            valorTotal += produto.preco; // Soma o preço para calcular o total
            const produtoDiv = document.createElement('div');
            produtoDiv.innerHTML = `
                <p><b>Produto:</b> ${produto.nome}</p>
                <p><b>Descrição:</b> ${produto.descricao}</p>
                <p><b>Preço:</b> R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="removerDoCarrinho(${index})">Remove</button>
                <hr />
            `;
            carrinhoItemsDiv.appendChild(produtoDiv);
        });
        carrinhoItemsDiv.innerHTML += `<p><b>Valor Total:</b> R$ ${valorTotal.toFixed(2)}</p>`;
    } else {
        carrinhoItemsDiv.innerHTML = '<p>Seu carrinho está vazio!</p>';
    }
}

// Função para remover produtos do carrinho
function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1); // Remove o produto do array
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage
    carregarCarrinho(); // Recarrega a lista
}

// Função para finalizar compra
function finalizarCompra() {
    alert('Compra finalizada!'); // Aqui você pode adicionar a lógica para finalizar a compra
    localStorage.removeItem('carrinho'); // Limpa o carrinho após a compra
    carregarCarrinho(); // Atualiza a exibição
}

// Carregar os produtos do carrinho ao abrir a página
window.onload = carregarCarrinho;