const apikey = "26f1e0fd7895472bac170935243112"; // Your API key

const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${cityValue}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const city = data.location.name;
    const region = data.location.region; // Get the region/state
    const temperature = Math.round(data.current.temp_c);
    const description = data.current.condition.text;
    const icon = data.current.condition.icon;

    const details = [
      `Region: ${region}`,
      `Feels like: ${Math.round(data.current.feelslike_c)}°C`,
      `Humidity: ${data.current.humidity}%`,
      `Wind speed: ${data.current.wind_kph} km/h`,
    ];

    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="https:${icon}" alt="Weather Icon">`;
    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;
    weatherDataEl.querySelector(".description").textContent = description;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");

    weatherDataEl.querySelector(
      ".city-name"
    ).textContent = `${city}, ${region}`; // Show city and region
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "An error happened, please try again later";

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}
