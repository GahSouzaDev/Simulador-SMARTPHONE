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
});
