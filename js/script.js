//o programa deve conter média/litros/viagens/hectares

// média aplicada por carga = hectares / viagens
// média de litros por viagem = litros / viagens

const data = document.querySelector('#data')
const fazendaGleba = document.querySelector('#fazendaGleba')
const frota = document.querySelector('#frota')
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
    let litros = qntLitros.value
    let numeroFormatado = formatarNumero(litros);
    let hectares = qntHectares.value
    hectares = hectares.replace(/,/g, '.')
    console.log(hectares)
    let litrosPorViagem = litros / qntViagens.value
    let litrosPorViagemFormatado = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(litrosPorViagem);

    // if(!data.value){
    //     alert('digite a data');return;
    // }

    if (!data.value) { alert("Por favor informe a data corretamente."); return location.reload(); } 

    if (!frota.value || frota.value <= 0) { alert("Por favor, insira a frota do equipamento."); return; } 

    
    if (!fazendaGleba.value || fazendaGleba.value <= 0) { alert("Por favor, insira o nome da fazenda/gleba."); return; }

    if (!frota.value || frota.value <= 0) { alert("Por favor, insira a frota do equipamento."); return; } 
    if (!qntViagens.value || isNaN(qntViagens.value) || qntViagens.value <= 0) { alert("Por favor, insira um número válido para a quantidade de viagens."); return; } 

    if (!qntLitros.value || isNaN(qntLitros.value) || qntLitros.value <= 0) { alert("Por favor, insira um número válido para a quantidade de litros."); return; }

    if (!hectares || isNaN(hectares) || hectares <= 0) { alert("Por favor, insira um número válido para a quantidade de hectares."); return;}


    baixar.style.display = 'block'
    display.innerHTML = ''
    evt.preventDefault()
    let mediaHec = hectares / qntViagens.value
    
    const dataValor = data.value
    if (dataValor) { 
            const data = new Date(`${dataValor}T00:00:00`); 
            const dia = String(data.getUTCDate()).padStart(2, '0'); 
            const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
            const ano = data.getUTCFullYear(); 
            var dataFormatada = `${dia}/${mes}/${ano}`; 
    }
    console.log(numeroFormatado)
    display.innerHTML += `
    <div><h2>Data: <p>${dataFormatada} </p></h2></div>
    <div><h2>Nº frota: <p>${frota.value} </p></h2></div>
    <div><h2>Nome da fazenda/gleba: <p>${fazendaGleba.value}</p></h2></div>
    <div><h2>Total de viagens: <p>${qntViagens.value} viagens</p></h2></div>
    <div><h2>Total de litros aplicados: <p>${numeroFormatado} litros </p></h2></div>
    <div><h2>Área aplicada:<p>${hectares} hectares </p></h2></div>
    <div><h2>Média de hectares aplicados: <p>${mediaHec.toFixed(2)} hectares por viagem </p></h2></div>
    <div><h2>Média de litros por viagem: <p>${litrosPorViagemFormatado} litros por viagem </p></h2></div>
    
    
    `
    
    qntViagens.value = ''
    qntLitros.value = ''
    qntHectares.value = ''
    qntViagens.focus()
    temosDados = true;
})

baixar.addEventListener('click', ()=>{
    if(temosDados){
        html2canvas(document.querySelector('.display'), { scale: 2,
        backgroundColor: null,
        useCORS: true,
        logging: true
        }).then(function (canvas) { 
            const newCanvas = document.createElement('canvas'); const targetWidth = 450; 
            const targetHeight = (canvas.height / canvas.width) * targetWidth; newCanvas.width = targetWidth; newCanvas.height = targetHeight; 
            const ctx = newCanvas.getContext('2d'); 
            ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; 
            ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, targetWidth, targetHeight);
            ctx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
            
        var link = document.createElement('a');
        link.download = 'médiaAplicada.png';
        link.href = newCanvas.toDataURL('image/png',1.0);
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


