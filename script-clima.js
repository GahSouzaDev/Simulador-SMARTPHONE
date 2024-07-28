document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('locationInfo').innerText = "Geolocalização não é suportada por este navegador.";
    }
});

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log(`Latitude: ${lat}, Longitude: ${lon}`);

    // Use a API OpenCage Geocoding
    const apiKeyOpenCage = 'ddd3c44cdb6f4abcac02c4b27ec9af84'; // Substitua pela sua chave de API do OpenCage
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKeyOpenCage}`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Dados de geocodificação recebidos:', data);
            if (data.status.code === 200 && data.results.length > 0) {
                const components = data.results[0].components;
                const city = components.city || components.town || components.village || 'Não disponível';
                const state = components.state || 'Não disponível';

                console.log(`Cidade: ${city}, Estado: ${state}`);

                document.getElementById('locationInfo').innerText = `Cidade: ${city}\nEstado: ${state}`;

                // Obter previsão do tempo
                getWeather(city, state);
            } else {
                document.getElementById('locationInfo').innerText = "Não foi possível obter informações de localização.";
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados de geocodificação:', error);
            document.getElementById('locationInfo').innerText = "Ocorreu um erro ao obter informações de localização.";
        });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            window.location.href = 'index.html'; // Redirecionar se a permissão for negada
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('locationInfo').innerText = "Informações de localização estão indisponíveis.";
            break;
        case error.TIMEOUT:
            document.getElementById('locationInfo').innerText = "A solicitação para obter a localização expirou.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('locationInfo').innerText = "Ocorreu um erro desconhecido.";
            break;
    }
}

function getWeather(city, state) {
    const apiKeyOpenWeatherMap = '54cd029a30d87af7bf71c8dc967fdb6b'; // Substitua pela sua chave de API do OpenWeatherMap
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},${encodeURIComponent(state)},BR&appid=${apiKeyOpenWeatherMap}&units=metric&lang=pt_br`;

    console.log('URL de previsão do tempo:', weatherUrl); // Log da URL para verificação

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Dados de previsão do tempo recebidos:', data); // Log dos dados recebidos
            if (data.cod === 200) {
                const temp = data.main.temp;
                const weatherDescription = data.weather[0].description;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
            
                document.getElementById('weatherInfo').innerText = `Previsão do tempo:\nTemperatura: ${temp}°C\nDescrição: ${weatherDescription}\nHumidade: ${humidity}%\nVelocidade do Vento: ${windSpeed} m/s`;
                document.getElementById('img-div').classList.remove('hidden'); // Remove a classe 'hidden' para exibir a div
                document.getElementById('img-div-final').classList.remove('hidden');
            } else {
                document.getElementById('weatherInfo').innerText = "Não foi possível obter a previsão do tempo.";
            }
            
        })
        .catch(error => {
            console.error('Erro ao buscar dados de previsão do tempo:', error);
            document.getElementById('weatherInfo').innerText = "Ocorreu um erro ao obter a previsão do tempo.";
        });
}
