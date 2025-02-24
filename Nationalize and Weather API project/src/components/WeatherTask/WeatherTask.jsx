import { useState, useRef } from "react";
import "./WeatherTask.css";
import SearchBar from "../SearchBar/SearchBar";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import validateInput from "./validateInput";

/* TODO:
    Create rest of task */

export default function WeatherTask() {
  const inputRef = useRef(null);
  const errorRef = useRef(null);
  // state to control the location of which the weather shall be displayed
  const [weatherLocation, setWeatherLocation] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // checking that the input isn't empty
    try {
      validateInput(inputRef.current.value);
    } catch (err) {
      errorRef.current = `ERROR: ${err.message}`;
      setWeatherLocation("error");
      return;
    }
    // setting the location to the user's input
    setWeatherLocation(inputRef.current.value);
    // resetting the input bar
    inputRef.current.value = "";
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
