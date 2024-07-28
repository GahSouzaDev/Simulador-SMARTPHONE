// Função para definir um cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

// Função para obter um cookie
function getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let c of ca) {
        c = c.trim();
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length);
    }
    return null;
}

// Função para salvar eventos no cookie
function setEventsCookie(events) {
    setCookie('events', JSON.stringify(events), 365);
}

// Função para obter eventos do cookie
function getEventsCookie() {
    const events = getCookie('events');
    return events ? JSON.parse(events) : [];
}

// Função para definir o papel de parede
function setWallpaper(imageUrl) {
    setCookie('wallpaper', imageUrl, 365);
    document.querySelector('section').style.backgroundImage = `url(${imageUrl})`;
}

// Função para aplicar o papel de parede salvo em todas as páginas
function applyWallpaper() {
    const wallpaper = getCookie('wallpaper');
    if (wallpaper) {
        document.querySelector('section').style.backgroundImage = `url(${wallpaper})`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const brightnessRange = document.getElementById('brightness-range');
    const brightnessOverlay = document.getElementById('brightness-overlay');
    const invertToggle = document.getElementById('invert-toggle');

    // Recupera o valor do brilho e o estado de inversão dos cookies
    const savedBrightness = getCookie('brightness');
    const savedInvert = getCookie('invert');
    
    // Define o brilho inicial
    if (savedBrightness) {
        brightnessRange.value = savedBrightness;
        brightnessOverlay.style.opacity = (100 - savedBrightness) / 100;
    }

    // Define o estado inicial de inversão de cores
    if (savedInvert === 'true') {
        document.body.classList.add('invert-colors');
        invertToggle.checked = true;
    }

    // Atualiza o brilho quando o usuário altera o controle deslizante
    brightnessRange.addEventListener('input', () => {
        const brightnessValue = brightnessRange.value;
        brightnessOverlay.style.opacity = (100 - brightnessValue) / 100;
        setCookie('brightness', brightnessValue, 7);
    });

    // Atualiza a inversão de cores quando o usuário altera o toggle
    invertToggle.addEventListener('change', () => {
        document.body.classList.toggle('invert-colors', invertToggle.checked);
        setCookie('invert', invertToggle.checked, 7);
    });

    // Aplica o papel de parede salvo
    applyWallpaper();
});

// Seleciona os elementos necessários
const currentTime = document.querySelector("h1");
const selectMenu = document.querySelectorAll('select');
const btnSetAlarm = document.querySelector('#btnSetAlarmDespertador');
const alarmList = document.querySelector('#alarmListDespertador');

// Array para armazenar os horários dos alarmes
let alarms = [];

// Atualiza a hora atual e verifica os alarmes a cada segundo
setInterval(() => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    currentTime.innerHTML = `${hours}:${minutes}:${seconds}`;

    alarms.forEach((alarm, index) => {
        if (alarm === `${hours}:${minutes}`) {
            window.location.href = "alarme.html";            
        }
    });
}, 1000);

// Preenche os menus de horas e minutos
function populateTimeMenus() {
    for (let i = 0; i < 24; i++) {
        const option = `<option value="${String(i).padStart(2, '0')}">${String(i).padStart(2, '0')}</option>`;
        selectMenu[0].insertAdjacentHTML("beforeend", option);
    }

    for (let i = 0; i < 60; i++) {
        const option = `<option value="${String(i).padStart(2, '0')}">${String(i).padStart(2, '0')}</option>`;
        selectMenu[1].insertAdjacentHTML("beforeend", option);
    }
}

populateTimeMenus();

// Função para definir um novo alarme
function setAlarm() {
    const time = `${selectMenu[0].value}:${selectMenu[1].value}`;
    if (time.includes("Hour") || time.includes("Minute")) {
        alert("Insira horas e minutos válidos para ativar o alarme, por favor!");
        return;
    }
    alarms.push(time);
    addAlarmToList(time);
    saveAlarms();
}

// Adiciona um evento de clique ao botão para definir um alarme
btnSetAlarm.addEventListener("click", setAlarm);

// Função para adicionar um alarme à lista exibida
function addAlarmToList(alarm) {
    const li = document.createElement('li');
    li.innerText = alarm;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "Excluir";
    deleteBtn.addEventListener('click', () => removeAlarm(alarms.indexOf(alarm)));
    li.appendChild(deleteBtn);

    alarmList.appendChild(li);
}

// Função para remover um alarme do array e da lista exibida
function removeAlarm(index) {
    alarms.splice(index, 1);
    saveAlarms();
    loadAlarms();
}

// Função para salvar os alarmes no cookie
function saveAlarms() {
    setCookie('alarms', JSON.stringify(alarms), 7);
}

// Função para carregar os alarmes salvos do cookie
function loadAlarms() {
    alarmList.innerHTML = "";
    alarms.forEach(addAlarmToList);
}

// Adiciona um evento para carregar os alarmes salvos quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    const savedAlarms = getCookie('alarms');
    if (savedAlarms) {
        alarms = JSON.parse(savedAlarms);
        loadAlarms();
    }
});
