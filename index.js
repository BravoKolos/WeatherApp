const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey = window.config.apiKey;

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city){

        const weatherData = await getWeatherData(city, apiKey);
        displayWeatherData(weatherData);

    } else {

        displayError("Oops...Please enter a valid location");
    }
});

async function getWeatherData(city, apiKey) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.appendChild(errorDisplay);
    
}

function displayWeatherData(data){

    const {
        name: city,
        main: {temp, humidity},
        weather: [{description, icon}]} = data;

        card.textContent = "";

        function displayCityName(city) {
            const cityDisplay = document.createElement("h1");
            cityDisplay.textContent = city;
            cityDisplay.classList.add("cityDisplay");
            card.appendChild(cityDisplay);
        }
        
        function displayTemperature(temp) {
            const tempDisplay = document.createElement("p");
            tempDisplay.textContent = `🌡${(temp - 273.15).toFixed(1)}°C`;
            tempDisplay.classList.add("tempDisplay");
            card.appendChild(tempDisplay);
        }

        function displayHumidity(humidity) {
            const humidityDisplay = document.createElement("p");
            humidityDisplay.textContent = " 💧 " + humidity + "%";
            humidityDisplay.classList.add("humidityDisplay");
            card.appendChild(humidityDisplay);
        }

        function displayDescription(description) {
            const descDisplay = document.createElement("p");
            descDisplay.textContent = description;
            descDisplay.classList.add("descDisplay");
            card.appendChild(descDisplay);
        }

        function displayWeatherEmoji(icon) {
            const weatherEmoji = document.createElement("img");
            weatherEmoji.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            weatherEmoji.classList.add("weatherEmoji");
            card.appendChild(weatherEmoji);
        }

        displayCityName(city);
        displayTemperature(temp);
        displayHumidity(humidity);
        displayDescription(description);
        displayWeatherEmoji(icon);

}
