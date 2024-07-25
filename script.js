function updateClock() {
    let h = new Date();
    let hor = h.getHours().toString().padStart(2, '0');
    let min = h.getMinutes().toString().padStart(2, '0');
    let dia = h.getDate().toString().padStart(2, '0');
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
    const notifica = document.getElementById('notifica');
    if (notifica.style.top === '0%') {
        notifica.style.top = '-100%';
        
    } else {
        notifica.style.top = '0%';
        configura.style.bottom = '-1700%';
    }
}
function configuracoes()
{
    const configura = document.getElementById('configura');
    if (configura.style.bottom === '0%') {
        configura.style.bottom = '-1700%';
        
    } else {
        configura.style.bottom = '0%';
        notifica.style.top = '-100%';
    }
}

function calculadora() {
    window.location.assign('app-calculadora.html');
}

function desenvolvimento() {
    window.location.assign('app-em-desenvolvimento.html');
}

function capturar() {
    const videoElement = document.getElementById('appcamera');
    if (videoElement) {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL('image/png');
        localStorage.setItem('capturedPhoto', dataURL);

        window.location.assign('foto.html');
    } else {
        console.error('Elemento de vídeo não encontrado.');
    }
}

function baixar() {
    const dataURL = localStorage.getItem('capturedPhoto');
    if (dataURL) {
        const img = new Image();
        img.src = dataURL;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            context.translate(canvas.width, 0);
            context.scale(-1, 1);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            const invertedDataURL = canvas.toDataURL('image/png');

            const a = document.createElement('a');
            a.href = invertedDataURL;
            a.download = 'foto-capturada.png';
            a.click();
        };
    } else {
        console.error('Nenhuma foto encontrada no localStorage.');
    }
}

function gravador() {
    window.location.assign('app-gravador.html');
}

function inicio() {
    window.location.assign('index.html');
}

function voltar() {
    const notifica = document.getElementById('notifica');
    const configura = document.getElementById('configura'); // Corrigido aqui
    const currentPath = window.location.pathname;

    // Verifica o estado atual de 'notifica' e 'configura' e altera a posição com base nisso
    if (notifica.style.top === '0%') {
        notifica.style.top = '-100%';
    } else if (configura.style.bottom === '0%') {
        configura.style.bottom = '-1700%';
    } else if (currentPath.endsWith('app-calculadora.html') || 
               currentPath.endsWith('app-camera.html') || 
               currentPath.endsWith('app-gravador.html') || 
               currentPath.endsWith('app-em-desenvolvimento.html')) {
        window.location.assign('index.html');
    } else if (currentPath.endsWith('reproduzir.html')) {
        window.location.assign('app-gravador.html');
    } else if (currentPath.endsWith('foto.html')) {
        window.location.assign('app-camera.html');
    }
}


// Função para carregar a gravação na página de reprodução
document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioUrl = localStorage.getItem('audioRecording');
    if (audioUrl) {
        audioPlayer.src = audioUrl;
    }
});
