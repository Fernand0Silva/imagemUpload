document.getElementById('Login').addEventListener('submit', async function(event) {
    event.preventDefault();

    const loginData = {
        Telefone: document.getElementById('telefone').value,
        Senha: document.getElementById('senha').value
    };

    try {
        const response = await fetch('http://localhost:3000/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

if (response.ok) {
// Armazena o token no localStorage
localStorage.setItem('token', data.token);

alert('Login realizado com sucesso!');
window.location.href = './Home.html'; 
} else {
alert('Telefone ou Senha incorretos');
}
} catch (error) {
console.error('Erro:', error);
alert('Erro ao realizar login');
}
});