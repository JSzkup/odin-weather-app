// src/domController.js
// Handle the DOM manipulation for displaying weather data.

import { getWeather } from "./weatherService";
import sunIcon from "./assets/icons/sun.svg";

function submitForm() {
  // submits the html form with the city input
  const weatherForm = document.getElementById("weather-form");
  const cityInput = document.getElementById("city");

  weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log("Form submitted with city:", cityInput.value);
    const weatherData = await getWeather(cityInput.value);
    updateWeatherDisplay(weatherData);
  });
}

function createListOfWeatherHTMLElements(weatherData) {
  if (weatherData) {
    const elements = {};
    document
      .querySelectorAll(".weather-display-elements")
      .forEach((element) => {
        const id = element.id;
        elements[id] = element;
      });

    return elements;
  }
  return null;
}

function createWeatherIcon() {
  const weatherIconContainer = document.getElementById("weather-icon");

  if (weatherIconContainer) {
    // Clear any previous content
    weatherIconContainer.innerHTML = "";

    // Create and append the image
    const iconImg = document.createElement("img");
    iconImg.src = sunIcon;
    iconImg.alt = "Weather icon";
    weatherIconContainer.appendChild(iconImg);
  }
}

function updateWeatherDisplay(weatherData) {
  // Update the DOM with the weather data

  const elements = createListOfWeatherHTMLElements(weatherData);

  elements.temperature.textContent = `Temperature: ${weatherData.temperature}°F`;
  elements.location.textContent = `Location: ${weatherData.location}`;
  elements.feelsLike.textContent = `Feels Like: ${weatherData.feelsLike}°F`;
  elements.precipitation.textContent = `Precipitation: ${weatherData.precipitation} inches`;
  elements.windSpeed.textContent = `Wind Speed: ${weatherData.windSpeed} mph`;
  // TODO include alerts

  createWeatherIcon();
}

export { submitForm, updateWeatherDisplay };
