// Função para definir um cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Função para obter um cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Função para salvar eventos no cookie
function setEventsCookie(events) {
    setCookie('events', JSON.stringify(events), 365); // Salva eventos nos cookies por 7 dias
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
        setCookie('brightness', brightnessValue, 7); // Salva o valor do brilho nos cookies por 7 dias
    });

    // Atualiza a inversão de cores quando o usuário altera o toggle
    invertToggle.addEventListener('change', () => {
        document.body.classList.toggle('invert-colors', invertToggle.checked);
        setCookie('invert', invertToggle.checked, 7); // Salva o estado de inversão nos cookies por 7 dias
    });

    // Aplica o papel de parede salvo
    applyWallpaper();
});
// Seleciona o elemento <h1> que exibe a hora atual
const currentTime = document.querySelector("h1"),
    // Seleciona o contêiner que contém os controles e o botão
    content = document.querySelector('.frame-despertador'),
    // Seleciona todos os elementos <select> usados para definir a hora e minutos do alarme
    selectMenu = document.querySelectorAll('select'),
    // Seleciona o botão para ativar o alarme
    btnSetAlarm = document.querySelector('#btnSetAlarmDespertador'),
    // Seleciona a lista <ul> onde os alarmes definidos serão exibidos
    alarmList = document.querySelector('#alarmListDespertador');

// Array para armazenar os horários dos alarmes
let alarms = [];

// Função que atualiza a hora atual e verifica os alarmes a cada segundo
setInterval(() => {
    // Obtém a data e hora atuais
    let date = new Date(),
        hours = date.getHours(), // Obtém a hora atual
        minutes = date.getMinutes(), // Obtém os minutos atuais
        seconds = date.getSeconds(); // Obtém os segundos atuais

    // Formata a hora, minutos e segundos para sempre ter dois dígitos
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Atualiza o conteúdo do elemento <h1> com a hora atual formatada
    currentTime.innerHTML = `${hours}:${minutes}:${seconds}`;

    // Verifica cada alarme definido
    alarms.forEach((alarm, index) => {
        // Compara o alarme com a hora atual
        if (alarm === `${hours}:${minutes}`) {
            // Redireciona para a página de alarme
            window.location.href = "alarme.html";
            
            // Remove o alarme após disparar
            removeAlarm(index);
        }
    });

}, 1000); // Atualiza a cada 1 segundo (1000 milissegundos)

// Preenche o menu de horas com opções de 00 a 23
for (let i = 23; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i; // Formata a hora com dois dígitos
    let option = `<option value="${i}">${i}</option>`; // Cria a opção para o menu
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option); // Adiciona a opção ao menu de horas
}

// Preenche o menu de minutos com opções de 00 a 59
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i; // Formata o minuto com dois dígitos
    let option = `<option value="${i}">${i}</option>`; // Cria a opção para o menu
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option); // Adiciona a opção ao menu de minutos
}

// Função para definir um novo alarme
function setAlarm() {
    // Cria uma string com a hora e minuto selecionados
    let time = `${selectMenu[0].value}:${selectMenu[1].value}`;
    // Verifica se as seleções são válidas
    if (time.includes("Hour") || time.includes("Minute")) {
        return alert("Insira horas e minutos válidos para ativar o alarme, por favor!");
    }
    // Adiciona o novo alarme ao array de alarmes
    alarms.push(time);
    // Adiciona o alarme à lista exibida
    addAlarmToList(time);
    // Salva os alarmes no cookie
    saveAlarms();
    // Salva os alarmes em um cookie para persistência
    document.cookie = `alarms=${JSON.stringify(alarms)}; path=/;`;
}

// Adiciona um evento de clique ao botão para definir um alarme
btnSetAlarm.addEventListener("click", setAlarm);

// Função para adicionar um alarme à lista exibida
function addAlarmToList(alarm) {
    let li = document.createElement('li'); // Cria um novo item de lista
    li.innerText = alarm; // Define o texto do item como o horário do alarme
    let deleteBtn = document.createElement('button'); // Cria um botão de excluir
    deleteBtn.innerText = "Excluir"; // Define o texto do botão como "Excluir"
    deleteBtn.addEventListener('click', () => {
        // Adiciona um evento de clique ao botão para remover o alarme
        removeAlarm(alarms.indexOf(alarm));
    });
    li.appendChild(deleteBtn); // Adiciona o botão ao item de lista
    alarmList.appendChild(li); // Adiciona o item de lista à lista de alarmes
}

// Função para remover um alarme do array e da lista exibida
function removeAlarm(index) {
    alarms.splice(index, 1); // Remove o alarme do array pelo índice
    saveAlarms(); // Salva a lista atualizada de alarmes
    loadAlarms(); // Recarrega a lista de alarmes exibida
}

// Função para salvar os alarmes no cookie
function saveAlarms() {
    document.cookie = `alarms=${JSON.stringify(alarms)}; path=/;`;
}

// Função para obter o valor de um cookie pelo nome
function getCookie(name) {
    let cookieArr = document.cookie.split(";"); // Divide o cookie em partes
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("="); // Divide o cookie em nome e valor
        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]); // Retorna o valor do cookie decodificado
        }
    }
    return null; // Retorna null se o cookie não for encontrado
}

// Função para carregar os alarmes salvos do cookie
function loadAlarms() {
    alarmList.innerHTML = ""; // Limpa a lista de alarmes exibida
    alarms.forEach(alarm => {
        // Adiciona cada alarme à lista exibida
        addAlarmToList(alarm);
    });
}

// Adiciona um evento para carregar os alarmes salvos quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    const savedAlarms = getCookie("alarms"); // Obtém os alarmes salvos do cookie
    if (savedAlarms) {
        alarms = JSON.parse(savedAlarms); // Converte os alarmes salvos de volta para um array
        loadAlarms(); // Carrega os alarmes na lista exibida
    }
});
