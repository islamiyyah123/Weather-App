// Selecting the active interface controller nodes from the UI document
const citySelect = document.getElementById('city-select');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherDashboard = document.getElementById('weather-dashboard');

// Story 5, 6 & 7: Asynchronous API communications data pipeline function
async function getWeather(city) {
    const proxyUrl = `https://weather-proxy.freecodecamp.rocks/api/city/${city}`;
    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error("Network latency or server validation error.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // Story 7: Logs underlying exceptions cleanly to the console log
        console.error("API Fetch operational failure:", error);
        return null;
    }
}

// Story 8, 9, 10 & 11: Core layout engine calculation and state controller
async function showWeather(city) {
    // Story 9: Executes target context method to grab data payload from backend 
    const weatherData = await getWeather(city);
    
    // Story 10: Triggers global system alerts if runtime issues occur or data fails
    if (!weatherData) {
        alert("Something went wrong, please try again later.");
        return;
    }

    // Unpacks structural inner parameters securely or assigns default N/A placeholders
    const locationName = weatherData.name || "N/A";
    const temp = weatherData.main?.temp !== undefined ? weatherData.main.temp : "N/A";
    const feelsLike = weatherData.main?.feels_like !== undefined ? weatherData.main.feels_like : "N/A";
    const humidityValue = weatherData.main?.humidity !== undefined ? weatherData.main.humidity : "N/A";
    const windSpeed = weatherData.wind?.speed !== undefined ? weatherData.wind.speed : "N/A";
    const windGust = weatherData.wind?.gust !== undefined ? weatherData.wind.gust : "N/A";
    const weatherMainType = weatherData.weather?.[0]?.main || "N/A";
    const iconUrl = weatherData.weather?.[0]?.icon ? `https://cdn.freecodecamp.org/weather-icons/${weatherData.weather[0].icon}.png` : "";

    // Story 11: Safely pushes data changes to individual display interface points
    document.getElementById('location').innerText = locationName;
    document.getElementById('weather-main').innerText = weatherMainType;
    document.getElementById('weather-icon').src = iconUrl;
    document.getElementById('main-temperature').innerText = temp;
    document.getElementById('feels-like').innerText = feelsLike;
    document.getElementById('humidity').innerText = humidityValue;
    document.getElementById('wind').innerText = windSpeed;
    document.getElementById('wind-gust').innerText = windGust;

    // Changes panel visibility state to visible once variables render safely
    weatherDashboard.style.display = "block";
}

// Button click event controller hook
getWeatherBtn.addEventListener('click', () => {
    const selectedCity = citySelect.value;
    
    // Story 3: Blocks empty values cleanly so nothing executes unless a city is picked
    if (selectedCity === "") {
        return;
    }
    
    // Executes application cycle pipeline mapping logic
    showWeather(selectedCity);
});
