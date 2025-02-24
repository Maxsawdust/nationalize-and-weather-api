import "./ErrorDisplay.css";

export default function ErrorDisplay({ isDisplayed, message }) {
  if (isDisplayed) {
    return (
      <div id="error-container" className="fade-in">
        <p id="error-message">{message}</p>
        <p id="try-again">Please try again</p>
      </div>
    );
  }
}
