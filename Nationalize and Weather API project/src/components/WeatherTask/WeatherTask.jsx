import { useState, useRef, useEffect } from "react";
import "./WeatherTask.css";
import SearchBar from "../SearchBar/SearchBar";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";

/* TODO:
    Create rest of task */

export default function WeatherTask() {
  const inputRef = useRef(null);
  const errorRef = useRef(null);
  // state to control the location of which the weather shall be displayed
  const [weatherLocation, setWeatherLocation] = useState(null);
  // using effect to call a function when weatherLocation is changed
  useEffect(() => console.log(weatherLocation), [weatherLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // function to get the user's location only if the button is pressed
  const getLocation = () => {
    console.log("getting location...");
    const options = {
      // always supply the most accurate results
      enableHighAccuracy: true,
      // maximum time in ms the device is allowed to take to respond
      timeout: 10000,
    };

    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const userPosition = lat + "," + lon;
      setWeatherLocation(userPosition);
    };

    const error = (err) => {
      errorRef.current = `ERROR(${err.code}): ${err.message}`;
      setWeatherLocation("error");
    };

    // using the Geolocation interface in order to acquire the user's location
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <div id="weather-container">
      <SearchBar
        ref={inputRef}
        handleSubmit={handleSubmit}
        getLocation={getLocation}
      />
      <ErrorDisplay
        isDisplayed={weatherLocation == "error"}
        message={errorRef.current}
      />
      <WeatherDisplay query={weatherLocation} />
    </div>
  );
}
