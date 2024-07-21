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

function capturar()
{
    const videoElement = document.getElementById('appcamera');
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Obtém a URL de dados da imagem capturada
    const dataURL = canvas.toDataURL('image/png');
    
    // Armazena a imagem no local storage
    localStorage.setItem('capturedPhoto', dataURL);

    // Redireciona para a página foto.html
    window.location.assign('foto.html');
}

function baixar() {
    // Recupera a imagem do local storage
    const dataURL = localStorage.getItem('capturedPhoto');
    if (dataURL) {
        // Cria uma nova imagem
        const img = new Image();
        img.src = dataURL;

        img.onload = () => {
            // Cria um canvas para desenhar a imagem invertida
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            // Inverte a imagem horizontalmente
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Obtém o data URL do canvas invertido
            const invertedDataURL = canvas.toDataURL('image/png');

            // Cria um link temporário para o download
            const a = document.createElement('a');
            a.href = invertedDataURL;
            a.download = 'foto-capturada.png'; // Nome do arquivo a ser salvo
            a.click();
        };
    }
}

function gravador()
{
    window.location.assign('app-gravador.html');//Carrega a pagina inicial 'F5'
}
async function play()
{
let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let startTime;
const playBtn = document.getElementById('play');
const recordIcon = document.getElementById('recordIcon');
const recordingTime = document.getElementById('recordingTime');
const recordingProgress = document.getElementById('recordingProgress');
const RECORDING_LIMIT = 100000; // Tempo máximo de gravação em milissegundos (100 segundos)
let timerInterval;

async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };
    
    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        // Guarde a gravação para uso posterior
        window.localStorage.setItem('audioRecording', audioUrl);
        audioChunks = [];
        clearInterval(timerInterval);
        recordingProgress.value = 0;
        recordingTime.textContent = '00:00';
        window.location.href = 'reproduzir.html'; // Redireciona para a página de reprodução
    };
    
    mediaRecorder.start();
    isRecording = true;
    startTime = Date.now();
    recordIcon.src = 'pause.png'; // Imagem para parar a gravação

    timerInterval = setInterval(updateTimer, 100);
}

function stopRecording() {
    mediaRecorder.stop();
    isRecording = false;
    recordIcon.src = 'play.png'; // Imagem para iniciar a gravação
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    recordingTime.textContent = `${minutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;
    
    const progress = Math.min((elapsedTime / RECORDING_LIMIT) * 100, 100);
    recordingProgress.value = progress;
    
    if (elapsedTime >= RECORDING_LIMIT) {
        stopRecording();
    }
}

playBtn.addEventListener('click', () => {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
});

    
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
    } else if (currentPath.endsWith('app-calculadora.html')||currentPath.endsWith('app-camera.html') || currentPath.endsWith('app-gravador.html')) {
        window.location.assign('index.html'); // Verifica onde esta para aplicar a função voltar, aplicando em uma pagina de cada vez
    } 
    else if(currentPath.endsWith('reproduzir.html'))
        {
            window.location.assign('app-gravador.html');
        }
    else if (currentPath.endsWith('foto.html'))
        {
            window.location.assign('app-camera.html'); // Carrega a página da câmera
        }
    else {
        // Se estiver na tela inicial não fazer nada!
    }
}

