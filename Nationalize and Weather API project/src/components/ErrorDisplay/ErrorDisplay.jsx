import "./ErrorDisplay.css";

export default function ErrorDisplay({ isDisplayed, message }) {
  if (isDisplayed) {
    return (
      <div id="error-container">
        <p id="error-message">{message}</p>
        <p id="try-again">Please try again</p>
      </div>
    );
  }
}
