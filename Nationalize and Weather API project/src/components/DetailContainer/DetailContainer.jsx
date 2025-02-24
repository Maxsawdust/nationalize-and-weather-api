import "./DetailContainer.css";

export default function DetailContainer({ img, data, text }) {
  return (
    <div className="detail-container">
      <img src={img} alt="" id="wind-speed-icon" />
      <div className="text-container">
        <p id="wind-speed-data">{data}</p>
        <p id="wind-speed-text">{text}</p>
      </div>
    </div>
  );
}
