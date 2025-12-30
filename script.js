const apiKey = "91b0b822f9d5436aac2130130253012";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const error = document.getElementById("error");

  error.innerText = "";

  if (city === "") {
    error.innerText = "Please enter a city name";
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
  document.getElementById("cityName").innerText =
    `${data.location.name}, ${data.location.country}`;

  document.getElementById("temperature").innerText =
    `🌡️ Temperature: ${data.current.temp_c}°C`;

  document.getElementById("condition").innerText =
    `☁️ Condition: ${data.current.condition.text}`;

  document.getElementById("humidity").innerText =
    `💧 Humidity: ${data.current.humidity}%`;

  document.getElementById("wind").innerText =
    `💨 Wind Speed: ${data.current.wind_kph} km/h`;

  document.getElementById("weatherIcon").src =
    `https:${data.current.condition.icon}`;

  // ===== WEATHER THEME LOGIC =====
  const conditionText = data.current.condition.text.toLowerCase();
  const body = document.body;

  body.classList.remove(
    "sunny",
    "cloudy",
    "rainy",
    "snowy",
    "misty",
    "thunder"
  );

  if (conditionText.includes("sunny") || conditionText.includes("clear")) {
    body.classList.add("sunny");
  } 
  else if (conditionText.includes("cloud")) {
    body.classList.add("cloudy");
  } 
  else if (conditionText.includes("rain") || conditionText.includes("drizzle")) {
    body.classList.add("rainy");
  } 
  else if (conditionText.includes("snow")) {
    body.classList.add("snowy");
  } 
  else if (
    conditionText.includes("mist") ||
    conditionText.includes("fog") ||
    conditionText.includes("haze")
  ) {
    body.classList.add("misty");
  } 
  else if (conditionText.includes("thunder")) {
    body.classList.add("thunder");
  }
})
.catch(err => {
  error.innerText = "City not found or API error";
  console.error(err);
});


    
}
