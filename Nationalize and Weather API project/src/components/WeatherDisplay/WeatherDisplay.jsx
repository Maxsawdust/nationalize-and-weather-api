import { useEffect, useState } from "react";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import "./WeatherDisplay.css";

export default function WeatherDisplay({ query }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  /* because I'm using VITE, I can't use "require(dotenv)" since it uses 
     ESM instead of CommonJS. This is also why I'm using "import.meta" instead
     of "process.env", since that is Node.js specific and not available in browser.
     VITE also requires the VITE_ prefix for security reasons. */

  /* NOTE: I have provided .env_sample. please remove the "_sample" from the file name, 
     and input your API key there */
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // when the query changes, check if it's a valid input and fetch weather data.
  useEffect(() => {
    if (query && query !== "error") {
      getWeatherData();
    }
  }, [query]);

  const getWeatherData = async () => {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`
    );
    /* an object with .current, giving the current weather data, and .location,
       giving location information such as the time */
    const data = await response.json();
    setCurrentWeather(data);
  };

  if (query === "error") {
    return <></>;
  }

  if (currentWeather && !currentWeather.error) {
    console.log(currentWeather);
    return (
      <div className="weather-display fade-in">
        <h1 id="weather-heading">{currentWeather.location.name}</h1>
        <div id="image-container">
          <img
            id="weather-image"
            src={currentWeather.current.condition.icon}
            alt={currentWeather.current.condition.text}
          />
          <h2 id="temperature">{currentWeather.current.temp_c}°C</h2>
          <p id="weather-type">{currentWeather.current.condition.text}</p>
        </div>
        <div id="additional-details">
          <div id="humidity">
            <img src="" alt="" id="humidity-icon" />
            <div className="text-container">
              <p id="humidity-data">{currentWeather.current.humidity}</p>
              <p id="humidity-text">Humidity</p>
            </div>
          </div>
          <div id="wind-speed">
            <img src="" alt="" id="wind-speed-icon" />
            <div className="text-container">
              <p id="wind-speed-data">{currentWeather.current.wind_mph}</p>
              <p id="wind-speed-text">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentWeather && currentWeather.error) {
    return (
      <ErrorDisplay
        isDisplayed={true}
        message={`ERROR(${currentWeather.error.code}): ${currentWeather.error.message}`}
      />
    );
  }
}
