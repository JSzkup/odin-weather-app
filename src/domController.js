// src/domController.js
// Handle the DOM manipulation for displaying weather data.

import { getWeather } from "./weatherService";
import sunIcon from "./assets/icons/sun.svg";
import cloudIcon from "./assets/icons/cloud.svg";
import cloudRainIcon from "./assets/icons/cloud-rain.svg";
import cloudSnowIcon from "./assets/icons/cloud-snow.svg";
import cloudLightningIcon from "./assets/icons/cloud-lightning.svg";
import windIcon from "./assets/icons/wind.svg";
import xIcon from "./assets/icons/x.svg";

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

function getWeatherIcon(iconString) {
  // dynamically selects the icon based on the icon string

  // Convert to lowercase for case-insensitive matching
  const condition = iconString ? iconString.toLowerCase() : "";

  // Match icon based on condition substring
  if (condition.includes("clear") || condition.includes("sunny")) {
    return sunIcon;
  } else if (
    condition.includes("rain") ||
    condition.includes("drizzle") ||
    condition.includes("shower")
  ) {
    return cloudRainIcon;
  } else if (
    condition.includes("snow") ||
    condition.includes("flurr") ||
    condition.includes("sleet")
  ) {
    return cloudSnowIcon;
  } else if (
    condition.includes("thunder") ||
    condition.includes("lightning") ||
    condition.includes("storm")
  ) {
    return cloudLightningIcon;
  } else if (
    condition.includes("cloud") ||
    condition.includes("overcast") ||
    condition.includes("fog")
  ) {
    return cloudIcon;
  } else if (condition.includes("wind") || condition.includes("breez")) {
    return windIcon;
  }

  // fallback icon if no conditions match
  return xIcon;
}

function createWeatherIcon(weatherData) {
  const weatherIconContainer = document.getElementById("weather-icon");

  if (weatherIconContainer) {
    // Clear any previous content
    weatherIconContainer.innerHTML = "";

    // Get the appropriate icon based on weather condition
    const iconToUse = getWeatherIcon(weatherData.icon);

    // Create and append the image
    const iconImg = document.createElement("img");
    iconImg.src = iconToUse;
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

  createWeatherIcon(weatherData);
}

export { submitForm, updateWeatherDisplay };
