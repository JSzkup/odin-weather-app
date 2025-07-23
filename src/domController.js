// src/domController.js
// Handle the DOM manipulation for displaying weather data.

import { getWeather } from "./weatherService";

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

async function getWeatherIcon(iconString) {
  // dynamically selects the icon based on the icon string

  let iconPath = "";

  // Convert to lowercase for case-insensitive matching
  const condition = iconString ? iconString.toLowerCase() : "";

  // Match icon based on condition substring
  if (condition.includes("clear") || condition.includes("sunny")) {
    iconPath = "sun";
  } else if (
    condition.includes("rain") ||
    condition.includes("drizzle") ||
    condition.includes("shower")
  ) {
    iconPath = "cloud-rain";
  } else if (
    condition.includes("snow") ||
    condition.includes("flurr") ||
    condition.includes("sleet")
  ) {
    iconPath = "cloud-snow";
  } else if (
    condition.includes("thunder") ||
    condition.includes("lightning") ||
    condition.includes("storm")
  ) {
    iconPath = "cloud-lightning";
  } else if (
    condition.includes("cloud") ||
    condition.includes("overcast") ||
    condition.includes("fog")
  ) {
    iconPath = "cloud";
  } else if (condition.includes("wind") || condition.includes("breez")) {
    iconPath = "wind";
  } else {
    // fallback icon
    iconPath = "x";
  }

  // Dynamically import the icon
  try {
    const iconModule = await import(`./assets/icons/${iconPath}.svg`);
    return iconModule.default;
  } catch (error) {
    console.error(`Failed to load icon: ${iconPath}`, error);
    // Fallback to x icon if there's an error
    const fallbackModule = await import("./assets/icons/x.svg");
    return fallbackModule.default;
  }
}

async function createWeatherIcon(weatherData) {
  const weatherIconContainer = document.getElementById("weather-icon");

  if (weatherIconContainer) {
    // Clear any previous content
    weatherIconContainer.innerHTML = "";

    // Get the appropriate icon based on weather condition
    const iconToUse = await getWeatherIcon(weatherData.icon);

    // Create and append the image
    const iconImg = document.createElement("img");
    iconImg.src = iconToUse;
    iconImg.alt = "Weather icon";
    weatherIconContainer.appendChild(iconImg);
  }
}

async function updateWeatherDisplay(weatherData) {
  // Update the DOM with the weather data

  const elements = createListOfWeatherHTMLElements(weatherData);

  elements.temperature.textContent = `${weatherData.temperature}°F`;
  elements.location.textContent = `Location: ${weatherData.location}`;
  elements.feelsLike.textContent = `Feels Like: ${weatherData.feelsLike}°F`;
  elements.precipitation.textContent = `Precipitation: ${weatherData.precipitation} inches`;
  elements.windSpeed.textContent = `Wind Speed: ${weatherData.windSpeed} mph`;

  await createWeatherIcon(weatherData);
}

export { submitForm, updateWeatherDisplay };
