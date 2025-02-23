import { useRef, useState } from "react";
// this is a map storing information about the button that I wanted to import to keep this file clean
import { buttonContents } from "./buttonContents";
import "./HoverButton.css";

export default function HoverButton({ value, id, type, onClick }) {
  // storing the currentHoverElement in a state
  const [currentHoverElement, setCurrentHoverElement] = useState(null);
  // storing the value property of the button in a ref
  const contentsRef = useRef(value);
  /* I needed to store isHovering in a ref because of the way state works asynchronously.
     I needed to be able to instantly set isHovering to true or false to compensate for
     quick mouse movements, which state didn't handle very well.*/
  const isHovering = useRef(false);

  const handleMouseOver = () => {
    isHovering.current = true;
    setTimeout(
      () =>
        setCurrentHoverElement(
          buttonContents[contentsRef.current].hoverElement
        ),
      200
    );
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    // this timeout protects against useState causing some issues
    setTimeout(() => {
      if (!isHovering.current) {
        setCurrentHoverElement(null);
      }
    }, 200);
  };

  return (
    <>
      <button
        className="search-bar-button"
        id={id}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        // only giving the button these properties if they are supplied
        {...(type && { type: type })}
        {...(onClick && { onClick: onClick })}
      >
        {buttonContents[contentsRef.current].svg}
      </button>
      {currentHoverElement}
    </>
  );
}
