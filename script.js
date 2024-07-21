function updateClock()
{
let h = new Date();//Pega hora do dispositivo
let hor = h.getHours().toString().padStart(2, '0');//Guarda a hora em 'hor' colocando '0' se o valor for de apenas uma casa decimal
let min = h.getMinutes().toString().padStart(2, '0');//Guarada os minutos em 'min' com a mesma função de adicionar o '0'
let dia = h.getDate().toString().padStart(2, '0');;
let mes = (h.getMonth() + 1).toString().padStart(2, '0');
let ano = h.getFullYear();

window.document.getElementById('hora').textContent = `${hor} : ${min}`;//Exibe a hora na div com id 'hora'
window.document.getElementById('data').textContent = `${dia} / ${mes} / ${ano}`;

window.document.getElementById('widthhora').textContent = `${hor} : ${min}`;
window.document.getElementById('widthdata').textContent = `${dia} / ${mes} / ${ano}`;
}
setInterval(updateClock, 1000);//Atualiza o relogio a cada 1000 milisegundos
updateClock();//Atualiza a hora assim que a pagina é carregada

function notificacoes() {
    const notifica = document.getElementById('notifica');//Ativa animação da barra de notificações
    if (notifica.style.top === '0%') {
        notifica.style.top = '-100%';
    } else {
        notifica.style.top = '0%';
    }
}

function calculadora()
{
    window.location.assign('app-calculadora.html');//Carrega a pagina da calculadora
}

function inicio()
{
    window.location.assign('index.html');//Carrega a pagina inicial 'F5'
}
function voltar()//Botão de navegação 'VOLTAR'  
{
    const notifica = document.getElementById('notifica');
    const currentPath = window.location.pathname;

    if (notifica.style.top === '0%') {
        notifica.style.top = '-100%'; // Se a barra de notificações estiver abaixada, o botão de voltar levanta ela.
    } else if (currentPath.endsWith('app-calculadora.html')||currentPath.endsWith('app-camera.html')) {
        window.location.assign('index.html'); // Verifica onde esta para aplicar a função voltar, aplicando em uma pagina de cada vez
    } else {
        // Se estiver na tela inicial não fazer nada!
    }
}
