/**
 * querySelectors should be written based on id. The ID attribute is always unique
 * so such queryselectors are more reliable, more stable. Otherwise,
 * when you have a selector based on a class, there there's a risk that somebody
 * adds another element with the same calss and your code would break
 *
  */
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey = window.config.apiKey;

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city, apiKey);

            /**
             * You could shorten this condition as fallows
             */
            // if (weatherData && weatherData.cod === "404") {
            if (weatherData?.weatherData?.cod === "404") {
                displayError("City not found. Please enter a valid location.");
            } else if (weatherData) {
                displayWeatherData(weatherData);
            } else {
                displayError("An unexpected error occurred.");
            }

        } catch (error) {
            displayError("An error occurred while fetching weather data.");
        }
    } else {
        displayError("Oops...Please enter a city name.");
    }
});


async function getWeatherData(city, apiKey) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const data = await response.json();

        /**
         * This console.log can be removed, it is only needed for debugging
         */

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

    /**
     * I can't see much sense in nesting the following functions inside displayWeatherData. I would take them out of it.
     * This way the code will be more readable. First I read the main function and the names of the functions it calls, and then
     * if necessary I can look into these functions
     */
    function displayCityName(city) {
            const cityDisplay = document.createElement("h1");
            cityDisplay.textContent = city;
            cityDisplay.classList.add("cityDisplay");
            card.appendChild(cityDisplay);
        }
        
        function displayTemperature(temp) {
            const tempDisplay = document.createElement("p");
            tempDisplay.textContent = `🌡️ ${(temp - 273.15).toFixed(1)}°C`;
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
