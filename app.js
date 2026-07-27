const API = "14b00f0c079a35e282af1ba8e426a0d5";

const form = document.getElementById("searchCity");
const cityInput = document.getElementById("city");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feels-like");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const icon = document.getElementById("weather-icon");
const error = document.getElementById("error");
const placeholder = document.getElementById("placeholder");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();

  if (city === "") {
    displayError("Please enter a city.");
    return;
  }

  getWeather(city);
});

async function getWeather(city) {
  showLoading();

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`,
    );

    const data = await response.json();

    if (!response.ok) {
      displayError(data.message);
      return;
    }
    displayWeather(data);

    cityInput.value = "";
    cityInput.focus();
  } catch (err) {
    displayError("Network error. Please try again.");
  }
}

function displayWeather(data) {
  placeholder.style.display = "none";
  cityName.textContent = data.name;

  temperature.textContent = `🌡 Temperature: ${data.main.temp}°C`;
  feelsLike.textContent = `🤗 Feels Like: ${data.main.feels_like}°C`;
  description.textContent = `☁ Weather: ${data.weather[0].description}`;
  humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
  wind.textContent = `💨 Wind: ${data.wind.speed} m/s`;

  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  icon.alt = data.weather[0].description;
  icon.style.display = "block";
}

function showLoading() {
  clearWeather();
  cityName.textContent = "Loading...";
  placeholder.style.display = "none";
}

function displayError(message) {
  clearWeather();
  error.textContent = message;
  placeholder.style.display = "none";
}

function clearWeather() {
  cityName.textContent = "";
  temperature.textContent = "";
  feelsLike.textContent = "";
  description.textContent = "";
  humidity.textContent = "";
  wind.textContent = "";

  icon.src = "";
  icon.alt = "";
  icon.style.display = "none";

  error.textContent = "";
}
