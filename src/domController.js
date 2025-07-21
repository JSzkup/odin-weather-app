// src/domController.js
// Handle the DOM manipulation for displaying weather data.

import { getWeather } from "./weatherService";

function submitForm() {
  // submits the html form with the city input
  const weatherForm = document.getElementById("weather-form");
  const cityInput = document.getElementById("city");

  weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Form submitted with city:", cityInput.value);
    getWeather(cityInput.value);
  });
}

export { submitForm };
