// src/weatherService.js
// This module fetches weather data from the Visual Crossing API and processes it into a single object.

async function fetchWeatherData(city) {
  // Fetch weather data from the Visual Crossing API
  const apiKey = process.env.WEATHER_API_KEY;
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`,
    { mode: "cors" }
  );
  const weatherData = await response.json();

  console.log("Raw weather data:", weatherData);

  return weatherData;
}

function splitAlerts(weatherData) {
  // if there are any weather alerts, log them
  if (weatherData.alerts && weatherData.alerts.length > 0) {
    return weatherData.alerts;
  } else {
    return [];
  }
}

function processJSON(weatherData) {
  // creates a weather object with the current conditions of desired city
  const weatherObject = {
    location: weatherData.resolvedAddress,
    temperature: weatherData.currentConditions.temp,
    feelsLike: weatherData.currentConditions.feelslike,
    precipitation: weatherData.currentConditions.precip,
    windSpeed: weatherData.currentConditions.windspeed,
    icon: weatherData.currentConditions.icon,
    alerts: splitAlerts(weatherData),
  };

  return weatherObject;
}

async function getWeather(city) {
  try {
    const weatherData = await fetchWeatherData(city);
    const processedData = processJSON(weatherData);
    console.log("Processed weather Object:", processedData);
    return processedData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

export { getWeather };
