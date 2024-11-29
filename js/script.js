//o programa deve conter média/litros/viagens/hectares

// média aplicada por carga = hectares / viagens
// média de litros por viagem = litros / viagens
const botao = document.querySelector('#resultado')
const qntViagens = document.querySelector('#viagens')
const qntLitros = document.querySelector('#litros')
const qntHectares = document.querySelector('#hectares')
const display = document.querySelector('.display')
const baixar = document.querySelector('#baixar')
const formulario = document.querySelector('#formulario')
const title = document.querySelector('#title')
let temosDados = false;
//adicionar um evento no botao resultado
botao.addEventListener('click',(evt)=>{
    esconderForm();
    if (!qntViagens.value || isNaN(qntViagens.value) || qntViagens.value <= 0) { alert("Por favor, insira um número válido para a quantidade de viagens."); return; } 

    if (!qntLitros.value || isNaN(qntLitros.value) || qntLitros.value <= 0) { alert("Por favor, insira um número válido para a quantidade de litros."); return; }

    if (!qntHectares.value || isNaN(qntHectares.value) || qntHectares.value <= 0) { alert("Por favor, insira um número válido para a quantidade de hectares."); return;}
    baixar.style.display = 'block'
    display.innerHTML = ''
    evt.preventDefault()
    let mediaHec = qntHectares.value / qntViagens.value
    
    let litros = qntLitros.value
    let numeroFormatado = formatarNumero(litros);
    let hectares = qntHectares.value
    let litrosPorViagem = litros / qntViagens.value
    let litrosPorViagemFormatado = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(litrosPorViagem);
    
    console.log(numeroFormatado)
    display.innerHTML += `
    <h2>Total de viagens: <p>${qntViagens.value} viagens</p></h2>
    <h2>Total de litros aplicados: <p>${numeroFormatado} litros </p></h2>
    <h2>Área aplicada:<p>${hectares} hectares </p></h2>
    <h2>Média de hectares aplicados <p>${mediaHec.toFixed(2)} hectares por viagem </p>
    </h2>
    <h2>Média de litros por viagem: <p>${litrosPorViagemFormatado} litros por viagem </p></h2>
    
    `
    
    qntViagens.value = ''
    qntLitros.value = ''
    qntHectares.value = ''
    qntViagens.focus()
    temosDados = true;
})

baixar.addEventListener('click', ()=>{
    if(temosDados){
        html2canvas(document.querySelector('.display')).then(function(canvas){
        var link = document.createElement('a');
        link.download = 'médiaAplicada.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        })
    }
})


function esconderForm(){
    formulario.style.display = 'none';
    title.innerHTML = 'Clique abaixo para obter a imagem:'

}


function formatarNumero(valor) {
    // Remove qualquer caractere que não seja número
    valor = valor.replace(/[^\d]/g, '');

    // Limita o número aos primeiros seis dígitos
    valor = valor.slice(0, 6);

    // Converte a string para número inteiro
    let numero = parseInt(valor);

    // Formata o número usando Intl.NumberFormat sem casas decimais
    let numeroFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numero);

    return numeroFormatado;
}


