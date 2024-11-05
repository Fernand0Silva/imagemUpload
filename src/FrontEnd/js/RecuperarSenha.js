// Função para buscar usuário quando o formulário for enviado
async function buscarUsuario(event) {
    event.preventDefault(); // Previne o comportamento padrão do form (recarregar a página)
    const searchQuery = document.getElementById('searchQuery').value; // Pegamos o valor digitado
     
    if (!searchQuery) {
        alert('Digite um número de telefone para pesquisar!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/Login/buscarDados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telefone: searchQuery }) // Envia o telefone no corpo da requisição
        });

        if (response.ok) {
            const usuario = await response.json();
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Limpa os resultados anteriores
            
            // Exibir os dados do usuário
            if (usuario) {
                resultsDiv.innerHTML = `
                    <h2>Dados do Usuário</h2>
                    <p><strong>Nome:</strong> ${usuario.Nome}</p>
                    <p><strong>Telefone:</strong> ${usuario.Telefone}</p>
                    <p><strong>Senha:</strong> ${usuario.Senha}</p>
                `;
            } else {
                resultsDiv.innerHTML = '<p>Nenhum usuário encontrado!</p>';
            }
        } else {
            alert('Erro ao buscar o usuário!');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar o usuário!');
    }
}

// Adicionar evento ao formulário de pesquisa
const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', buscarUsuario);