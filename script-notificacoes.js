document.addEventListener('DOMContentLoaded', () => {
    const notifica = document.getElementById('notifica');
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    // Função para mostrar ou esconder a barra de notificações
    function notificacoes() {
        if (notifica.style.top === '0%') {
            notifica.style.top = '-100%';
        } else {
            notifica.style.top = '0%';
            document.getElementById('configura').style.bottom = '-1700%';
        }
    }

    document.getElementById('notificacao').addEventListener('click', notificacoes);

    notifica.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        isDragging = true;
    });

    notifica.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentY = e.touches[0].clientY;
        const diffY = currentY - startY;

        if (diffY < 0) {
            notifica.style.top = `${diffY}px`;
        }
    });

    notifica.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diffY = currentY - startY;

        if (diffY < -50) {
            // Se arrastou para cima mais de 50px, esconder notificação
            notifica.style.top = '-100%';
        } else {
            // Voltar para a posição original
            notifica.style.top = '0';
        }
    });

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

    // Função para verificar o horário e redirecionar
    function checkTime() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const currentTime = `${hours}:${minutes}`;

        // Recupera o horário de despertar do cookie
        const savedAlarms = getCookie('alarms');
        if (savedAlarms) {
            const alarms = JSON.parse(savedAlarms);
            if (alarms.includes(currentTime)) {
                const lastRedirect = localStorage.getItem('lastRedirect');

                if (lastRedirect !== currentTime) {
                    localStorage.setItem('lastRedirect', currentTime);
                    window.location.href = "alarme.html";
                }
            }
        }
    }

    // Verifica o horário a cada segundo
    setInterval(checkTime, 1000);

    // Verifica o horário imediatamente após o carregamento da página
    checkTime();
});
