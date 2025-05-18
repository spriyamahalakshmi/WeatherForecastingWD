const apikey = "7ddc16629e99dffbeca2f412cb998dc0";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const SearchBox = document.querySelector(".search input");
const SearchBtn = document.querySelector(".search button");
const weatherIcons = document.querySelector(".icons");

// Function to get recommendations based on weather type
function getRecommendations(weatherType) {
    switch (weatherType) {
        case "Clouds":
            return ["Carry an umbrella.", "Wear a light jacket."];
        case "Clear":
            return ["Use sunscreen.", "Wear cap and sunglasses."];
        case "Rain":
            return ["Carry an umbrella.", "Wear waterproof shoes."];
        case "Drizzle":
            return ["Carry an umbrella.", "Wear a light raincoat."];
        case "Mist":
            return ["Drive carefully.", "Use fog lights if driving."];
        default:
            return ["No specific recommendations."];
    }
}

// Function to fetch weather data and populate the forecast and recommendations
async function weatherCity(city) {
    const response = await fetch(apiurl + city + &appid=${apikey});
    const data = await response.json();
   
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".winds").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcons.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcons.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcons.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcons.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcons.src = "images/mist.png";
    }

    // Fetch recommendations based on weather
    const recommendations = getRecommendations(data.weather[0].main);

    // Populate recommendations box
    const recommendationsDiv = document.querySelector(".recommendations");
    recommendationsDiv.innerHTML = "<h2>Recommendations</h2>";
    const recommendationsList = document.createElement("ul");
    recommendations.forEach((recommendation) => {
        const listItem = document.createElement("li");
        listItem.textContent = recommendation;
        recommendationsList.appendChild(listItem);
    });
    recommendationsDiv.appendChild(recommendationsList);
// fetch alerts signal 
    function displayWeatherAlerts(alerts) {
        const alertsContainer = document.querySelector(".alerts");
        
        if (!alertsContainer) {
            return;
        }
    
        alertsContainer.innerHTML = ''; // Clear previous alerts
        
        if (alerts.length === 0) {
            alertsContainer.innerHTML = '<p>No weather alerts for this location.</p>';
            return;
        }
    
        const alertList = document.createElement('ul');
        alerts.forEach(alert => {
            const listItem = document.createElement('li');
            listItem.textContent = ${alert.event}: ${alert.description};
            alertList.appendChild(listItem);
        });
        alertsContainer.appendChild(alertList);
    }

    // Show weather forecast box
    recommendationsDiv.style.display = "block";
    document.querySelector(".weather").style.display ="block";
}

// Event listener for search button click
SearchBtn.addEventListener("click", () => {
    weatherCity(SearchBox.value);
});