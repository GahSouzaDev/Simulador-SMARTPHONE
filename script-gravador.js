let mediaRecorder;
let audioChunks = [];
let startTime;
let accumulatedTime = 0; // Tempo acumulado das gravações anteriores
const RECORDING_LIMIT = 60000; // Limite de gravação em milissegundos (1 minuto)
let timerInterval;

const recordBtn = document.getElementById('recordBtn');
const stopBtn = document.getElementById('stopBtn');
const audioPlayback = document.getElementById('audioPlayback');
const recordingProgress = document.getElementById('recordingProgress');
const recordingTime = document.getElementById('recordingTime');

recordBtn.addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        audioPlayback.src = audioUrl;
        audioPlayback.style.display = 'block';
    };

    mediaRecorder.start();
    startTime = Date.now();
    recordBtn.disabled = true;
    stopBtn.disabled = false;

    startRecordingTimer();
});

stopBtn.addEventListener('click', () => {
    mediaRecorder.stop();
    accumulatedTime += Date.now() - startTime; // Acumula o tempo da gravação atual
    recordBtn.disabled = false;
    stopBtn.disabled = true;
    stopRecordingTimer();
});

function startRecordingTimer() {
    recordingTime.style.display = 'block';
    recordingProgress.style.display = 'block';
    updateRecordingTimer();
}

function stopRecordingTimer() {
    clearInterval(timerInterval);
}

function updateRecordingTimer() {
    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime + accumulatedTime;
        const seconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const displaySeconds = seconds % 60;
        recordingTime.textContent = `${minutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;
        
        const progress = Math.min((elapsedTime / RECORDING_LIMIT) * 100, 100);
        recordingProgress.value = progress;
        
        if (elapsedTime >= RECORDING_LIMIT) {
            mediaRecorder.stop();
            recordBtn.disabled = false;
            stopBtn.disabled = true;
            stopRecordingTimer();
        }
    }, 1000);
}
