// src/index.js

// testing importing api key from environment variables
// console.log("API Key:", process.env.WEATHER_API_KEY);

async function fetchWeatherData(city) {
  const apiKey = process.env.WEATHER_API_KEY;
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`,
    { mode: "cors" }
  );
  const weatherData = await response.json();

  console.log(weatherData);

  console.log("---Weather Data Fetched---");

  console.log(weatherData.currentConditions.temp);
  console.log(weatherData.currentConditions.feelslike);
  console.log(weatherData.currentConditions.precip);

  return weatherData;
}

function checkForAlerts(weatherData) {
  if (weatherData.alerts && weatherData.alerts.length > 0) {
    weatherData.alerts.forEach((alert) => {
      console.log(alert.event); // This will log each alert's event
    });
  } else {
    console.log("No weather alerts available");
  }
}

fetchWeatherData("New York");
