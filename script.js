function updateClock()
{
let h = new Date();//Pega hora do dispositivo
let hor = h.getHours().toString().padStart(2, '0');//Guarda a hora em 'hor' colocando '0' se o valor for de apenas uma casa decimal
let min = h.getMinutes().toString().padStart(2, '0');//Guarada os minutos em 'min' com a mesma função de adicionar o '0'
window.document.getElementById('hora').textContent = `${hor} : ${min}`;//Exibe a hora na div com id 'hora'
}
setInterval(updateClock, 1000);//Atualiza o relogio a cada 1000 milisegundos
updateClock();//Atualiza a hora assim que a pagina é carregada

function notificacoes() {
    const notifica = document.getElementById('notifica');
    if (notifica.style.top === '0%') {
        notifica.style.top = '-100%';
    } else {
        notifica.style.top = '0%';
    }
}
function inicio()
{
    window.location.assign('index.html');
}
