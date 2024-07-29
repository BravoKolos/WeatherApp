const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "f650c3891c4c2457a7513e6f90b6309d";


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
    card.style.display = "flex";
    card.appendChild(errorDisplay);
    
}

function displayWeatherData(data){

    //destructuring
    const {
        name: city,
        main: {temp, humidity},
        weather: [{description, id}]} = data;

        // creating elements for weather
        card.textContent = "";
        card.style.display = "flex";
        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");

        // city name
        cityDisplay.textContent = city;
        card.appendChild(cityDisplay);
        cityDisplay.classList.add("cityDisplay");
        
        // current temp
        tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
        tempDisplay.classList.add("tempDisplay");
        card.appendChild(tempDisplay);


        //humidity
        humidityDisplay.textContent = "💦: " + humidity + "%";
        card.appendChild(humidityDisplay);
        humidityDisplay.classList.add("humidityDisplay");

        //description
        descDisplay.textContent = description;
        card.appendChild(descDisplay);
        descDisplay.classList.add("descDisplay");
        
        //temp id with Emoji
        weatherEmoji.textContent = id;
        card.appendChild(weatherEmoji);
        weatherEmoji.classList.add("weatherEmoji");

}
