import HoverButton from "../HoverButton/HoverButton";
import "./SearchBar.css";

export default function SearchBar({ ref, handleSubmit, getLocation }) {
  return (
    <form id="weather-search-bar" onSubmit={handleSubmit}>
      <input type="text" id="weather-input" placeholder=" " ref={ref} />
      <span id="weather-input-label">Enter a Location</span>
      <HoverButton value="search" id="search-button" />
      <HoverButton
        value="locate"
        id="locate-button"
        onClick={getLocation}
        type="button"
      />
    </form>
  );
}
