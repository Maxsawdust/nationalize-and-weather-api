import { useState } from "react";
import Header from "./components/Header/Header";
import NationalizeTask from "./components/NationalizeTask/NationalizeTask";
import WeatherTask from "./components/WeatherTask/WeatherTask";
import "./App.css";

function App() {
  const [currentTask, setCurrentTask] = useState(
    <h1>Press a button to select a task to display</h1>
  );

  return (
    <>
      <main id="main-container">
        <Header onClick={setCurrentTask} />
        <div id="task-container">{currentTask}</div>
      </main>
    </>
  );
}

export default App;
