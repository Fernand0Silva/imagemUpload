async function listarArtesaos() {
    try {
        const response = await fetch('http://localhost:3000/Artesao', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const artesaos = await response.json();
            const listaArtesaosDiv = document.getElementById('listarArtesaos');
            listaArtesaosDiv.innerHTML = ''; // Limpa a lista antes de preencher

            if (artesaos.length > 0) {
                artesaos.forEach(artesao => {
                    const artesaoDiv = document.createElement('div');
                    artesaoDiv.innerHTML = `
                        <p><strong>ID:</strong> ${artesao.Id}</p>
                        <p>Nome: ${artesao.Nome}</p>
                        <p>Cidade: ${artesao.Cidade}</p>
                        <p>RG: ${artesao.Rg}</p>
                        <p>CPF: ${artesao.Cpf}</p>
                        <p>Email: ${artesao.Email}</p>
                        <p>Telefone: ${artesao.Telefone}</p>
                        <p>Endereço: ${artesao.Endereco}</p>
                        <p>Idade: ${artesao.Idade}</p>
                    `;
                    listaArtesaosDiv.appendChild(artesaoDiv);
                });
            } else {
                listaArtesaosDiv.innerHTML = '<p>Nenhum artesão cadastrado!</p>';
            }
        } else {
            alert('Erro ao buscar os artesão!');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar os artesãos!');
    }
}

// Chama a função ao carregar a página
window.onload = listarArtesaos;