// Sélection des éléments HTML
const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const locationEl = document.getElementById('location');

// Votre clé API OpenWeatherMap
const apiKey = '36d0ddd458d5cbbc4d9c291219f846d1';

// Fonction pour récupérer les données météo
async function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`City not found (${response.status})`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

// Fonction pour mettre à jour le DOM
function updateWeatherUI(data) {
    temperatureEl.textContent = `Temperature: ${data.main.temp}°C`;
    descriptionEl.textContent = `Weather: ${data.weather[0].description}`;
    locationEl.textContent = `Location: ${data.name}, ${data.sys.country}`;
}

// Fonction pour gérer la soumission du formulaire
async function handleFormSubmit(event) {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    try {
        const weatherData = await fetchWeather(city);
        updateWeatherUI(weatherData);
    } catch (error) {
        alert('Error fetching weather data. Please try again.');
    }
}

// Ajouter l'écouteur d'événement au formulaire
form.addEventListener('submit', handleFormSubmit);
