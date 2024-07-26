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
    const resetArea = document.getElementById('reset-area'); // Área para detectar o gesto de tocar e arrastar para baixo

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

    // Função para resetar as configurações com movimento para baixo
    function resetSettings() {
        // Reset brightness
        brightnessRange.value = 100;
        brightnessOverlay.style.opacity = (100 - 100) / 100; // Totalmente visível
        setCookie('brightness', 100, 7);

        // Reset invert colors
        invertToggle.checked = false;
        document.body.classList.remove('invert-colors');
        setCookie('invert', false, 7);

        // Remove papel de parede
        setCookie('wallpaper', '', 365); // Remove o cookie do papel de parede
        document.querySelector('section').style.backgroundImage = ''; // Remove o fundo
    }

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    resetArea.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        isDragging = true;
    });

    resetArea.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentY = e.touches[0].clientY;
        const diffY = currentY - startY;

        if (diffY > 50) { // Movimento para baixo maior que 50px
            // Mostra feedback visual, se necessário
        }
    });

    resetArea.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;

        const diffY = currentY - startY;

        if (diffY > 50) { // Movimento para baixo maior que 50px
            resetSettings(); // Reseta configurações
        }
    });
});
