export default function WeatherDisplay({ query }) {
  if (query && query !== "error") {
    return (
      <div className="weather-display">
        <h1 id="weather-heading">The weather in loompaland is</h1>
        <div id="image-container">
          <span id="weather-image"></span>
          <h2 id="temperature">100</h2>
          <p id="weather-type"></p>
        </div>
        <div id="additional-details">
          <span id="humidity"></span>
          <span id="wind-speed"></span>
        </div>
      </div>
    );
  }
}
