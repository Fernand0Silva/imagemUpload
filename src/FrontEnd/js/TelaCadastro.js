document.getElementById('Cadastro').addEventListener('submit', async function(event) {
    event.preventDefault();

    const cadastro = {
        Nome: document.getElementById('nome').value,
        Telefone: document.getElementById('telefone').value,
        Senha: document.getElementById('senha').value,
    };

    try {
        const response = await fetch('http://localhost:3000/Cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cadastro)
        });

        if (response.ok) {
            alert('Dados cadastrados com sucesso!');
        } else {
            alert('Erro ao cadastrar os dados!');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao enviar os dados!');
    }
});