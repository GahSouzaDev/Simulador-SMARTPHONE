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
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

document.addEventListener('DOMContentLoaded', () => {
    const brightnessRange = document.getElementById('brightness-range');
    const brightnessOverlay = document.getElementById('brightness-overlay');

    // Recupera o valor do brilho dos cookies
    const savedBrightness = getCookie('brightness');
    if (savedBrightness) {
        brightnessRange.value = savedBrightness;
        brightnessOverlay.style.opacity = (100 - savedBrightness) / 100;
    }

    brightnessRange.addEventListener('input', () => {
        const brightnessValue = brightnessRange.value;
        brightnessOverlay.style.opacity = (100 - brightnessValue) / 100;
        setCookie('brightness', brightnessValue, 7); // Salva o valor do brilho nos cookies por 7 dias
    });
});
