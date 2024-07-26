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

            brightnessRange.addEventListener('input', () => {
                const brightnessValue = brightnessRange.value;
                // Ajusta a opacidade da camada de brilho
                brightnessOverlay.style.opacity = (100 - brightnessValue) / 100;
                setCookie('brightness', brightnessValue, 7); // Salva o valor do brilho nos cookies por 7 dias
            });

            invertToggle.addEventListener('change', () => {
                document.body.classList.toggle('invert-colors', invertToggle.checked);
                setCookie('invert', invertToggle.checked, 7); // Salva o estado de inversão nos cookies por 7 dias
            });

            // Aplica o papel de parede salvo
            applyWallpaper();
        });
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

            brightnessRange.addEventListener('input', () => {
                const brightnessValue = brightnessRange.value;
                // Ajusta a opacidade da camada de brilho
                brightnessOverlay.style.opacity = (100 - brightnessValue) / 100;
                setCookie('brightness', brightnessValue, 7); // Salva o valor do brilho nos cookies por 7 dias
            });

            invertToggle.addEventListener('change', () => {
                document.body.classList.toggle('invert-colors', invertToggle.checked);
                setCookie('invert', invertToggle.checked, 7); // Salva o estado de inversão nos cookies por 7 dias
            });

            // Aplica o papel de parede salvo
            applyWallpaper();
        });