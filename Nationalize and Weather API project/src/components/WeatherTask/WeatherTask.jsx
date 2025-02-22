import { useGeolocated } from "react-geolocated";
import { useState, useRef } from "react";
import "./WeatherTask.css";
import HoverButton from "../HoverButton/HoverButton";

export default function WeatherTask() {
  return (
    <div id="weather-container">
      <div id="weather-search-bar">
        <input type="text" id="weather-input" placeholder=" " />
        <span id="weather-input-label">Enter a Location</span>
        <HoverButton value="search" id="search-button" />
        <HoverButton value="locate" id="locate-button" />
        {/* TODO:
              Turn search bar into component,
              Create rest of task */}
      </div>
    </div>
  );
}
