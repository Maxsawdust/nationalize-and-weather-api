import { useRef, useState, useEffect } from "react";

export default function NationalizeTask() {
  // using ref to get the input element
  const inputRef = useRef(null);
  // using state to store the nationality and probability
  const [nationality, setNationality] = useState(null);
  // using effect to focus the input on render
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // function called on form submit
  const guessNationality = async (e) => {
    e.preventDefault();
    // getting the user's name based on ref's value
    const name = inputRef.current.value;
    // fetching data based on user's input
    const response = await fetch(`https://api.nationalize.io?name=${name}`);
    const data = await response.json();

    // using the setter to store the user's nationality in an object
    setNationality({
      country: data.county[0].country_id,
      probability: data.county[0].probability,
    });
  };

  return (
    <>
      <h1 id="nationality">Your nationality is:</h1>
      <h2 id="probability">With a probability of: </h2>

      <form id="input-form" onSubmit={guessNationality}>
        <p>Enter your name to estimate your nationality!</p>
        <input type="text" ref={inputRef} />
        <button id="submit-button">Submit</button>
      </form>
    </>
  );
}
