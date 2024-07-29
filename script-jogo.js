document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const countdownDisplay = document.createElement('div');
    countdownDisplay.id = 'countdown';
    document.body.appendChild(countdownDisplay);

    const personagem = document.getElementById('personagem');
    const pipe = document.getElementById('pipe');
    const pontuacaoDisplay = document.getElementById('pontuacao');

    let startTime, intervalId;
    let pipeAnimationDuration = 1.35; // Valor inicial da duração da animação em segundos
    const speedDecrease = 0.0015; // Valor para diminuir a duração da animação

    // Inicialmente oculta os elementos 'personagem' e 'pipe'
    personagem.style.display = 'none';
    pipe.style.display = 'none';
    restartButton.style.display = 'none'; // Inicialmente oculta o botão de reinício

    // Remove a classe 'botaooff' do botão ao iniciar
    startButton.classList.remove('botaooff');

    // Função para reiniciar o valor da animação do pipe
    const resetPipeAnimation = () => {
        pipeAnimationDuration = 1.35; // Valor inicial da duração da animação
        pipe.style.animationDuration = `${pipeAnimationDuration}s`;
    };

    // Função para iniciar o jogo
    const startGame = () => {
        console.log('Iniciando o jogo...');

        // Torna os elementos 'personagem' e 'pipe' visíveis
        personagem.style.display = 'block';
        pipe.style.display = 'block';

        // Inicializa a contagem do tempo
        startTime = Date.now();
        intervalId = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            pontuacaoDisplay.textContent = `Tempo: ${elapsedTime}s`;
        }, 1000);

        // Inicializa a duração da animação do pipe
        pipe.style.animationDuration = `${pipeAnimationDuration}s`;

        // Diminui a duração da animação do pipe a cada segundo
        const decreaseAnimationDuration = () => {
            pipeAnimationDuration -= speedDecrease;
            if (pipeAnimationDuration < 0.1) pipeAnimationDuration = 0.1; // Limita a duração mínima da animação
            pipe.style.animationDuration = `${pipeAnimationDuration}s`;
            pontuacaoDisplay.textContent = `Tempo: ${Math.floor((Date.now() - startTime) / 1000)}s`;
        };

        const animationInterval = setInterval(decreaseAnimationDuration, 1000);

        const jump = () => {
            personagem.classList.add('jump');
            setTimeout(() => {
                personagem.classList.remove('jump');
            }, 800);
        };

        const loop = setInterval(() => {
            const personagemPosition = +window.getComputedStyle(personagem).bottom.replace('px', '');
            const pipePosition = pipe.offsetLeft;

            console.log(pipePosition);

            if (pipePosition <= 110 && pipePosition > 0 && personagemPosition <= 110) {
                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;

                personagem.style.animation = 'none';
                personagem.style.bottom = `${personagemPosition}px`;

                personagem.src = 'game-over.png';
                personagem.style.width = '95px';
                personagem.style.marginLeft = '50px';

                clearInterval(loop);
                clearInterval(intervalId);
                clearInterval(animationInterval); // Para a atualização da duração da animação

                // Mostrar o botão de reinício somente quando o jogo estiver em game over
                restartButton.style.display = 'block';

                // Reiniciar o valor da animação do pipe
                resetPipeAnimation();
            }
        }, 10);

        // Adiciona os event listeners para o salto
        document.addEventListener('keydown', jump);
        document.addEventListener('touchstart', jump);
    };

    // Adiciona um event listener para o clique no botão de início
    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        countdownDisplay.style.display = 'block';
        let countdown = 3;

        // Função para atualizar a contagem regressiva
        const updateCountdown = () => {
            countdownDisplay.textContent = countdown;
            if (countdown > 0) {
                countdown--;
                setTimeout(updateCountdown, 1000);
            } else {
                countdownDisplay.style.display = 'none';
                startGame();
            }
        };

        updateCountdown();
    });

    // Adiciona um event listener para o clique no botão de reinício
    restartButton.addEventListener('click', () => {
        // Recarrega a página
        window.location.reload();
    });
});
