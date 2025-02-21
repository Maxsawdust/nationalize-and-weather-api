import NationalizeTask from "../NationalizeTask/NationalizeTask";
import WeatherTask from "../WeatherTask/WeatherTask";
import "./Header.css";

export default function Header(props) {
  return (
    <div id="header-div">
      <button
        className="task-button"
        onClick={() => props.onClick(<NationalizeTask />)}
      >
        Task 1
      </button>
      <button
        className="task-button"
        onClick={() => props.onClick(<WeatherTask />)}
      >
        Task 2
      </button>
    </div>
  );
}
