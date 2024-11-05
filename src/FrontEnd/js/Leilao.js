function precoInicial(){
    let precoTexto = document.getElementById('valorMinimo').innerText;
    let valorInicial = parseFloat(precoTexto.replace('Preço Inicial: R$ ', '').replace(',','.').trim());
    return valorInicial;
}
function ofertar(){
    const valorInicial = parseFloat( document.getElementById('oferta').value);
    const ClienteInicial = document.getElementById('cliente').value;
    const minimo = precoInicial();
    if(valorInicial < minimo){
        alert("A oferta deve ser maior ou igual a R$ " + minimo.toFixed(2));
    }else{
        document.getElementById('ultimaOferta').innerText="Última oferta: R$ " + valorInicial.toFixed(2);;
    document.getElementById('ultimoCliente').innerText="Última Cliente: " + ClienteInicial;
    }
}
function limpa(){
    const valorInicial = document.getElementById('oferta').value = " ";
    const ClienteInicial = document.getElementById('cliente').value = " ";
    clearInterval(intervalo);
    alert("Contagem cancelada!");            

    let n = document.getElementById('tempo').value = " ";


    document.getElementById('ultimaOferta').innerText="Última oferta: R$ " ;
    document.getElementById('ultimoCliente').innerText="Última Cliente: " ;
    document.getElementById('tempoLimite').innerText="Tempo: "   ;
    

}
let intervalo;
function btnTempo(){
    let n = document.getElementById('tempo').value;
    
    if(n > 0){
        intervalo = setInterval(function(){
            n--;
            document.getElementById('tempo').value = n;

            if(n <= 0 ){
                clearInterval(intervalo);
                alert("Tempo esgotado!");
            }
        },1000);
        document.getElementById('tempoLimite').innerText="Tempo: " + n ;
    }
    

}