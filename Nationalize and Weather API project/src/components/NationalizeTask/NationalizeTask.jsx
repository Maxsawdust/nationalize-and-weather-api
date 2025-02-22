import { useRef, useState, useEffect } from "react";
import "./NationalizeTask.css";

export default function NationalizeTask() {
  // using ref to get the input element
  const inputRef = useRef(null);
  // storing resultJSX in state
  const [resultJSX, setResultJSX] = useState("");
  // storing errorAlert in state
  const [errorAlert, setErrorAlert] = useState("");
  // using effect to focus the input on render
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // function called on form submit
  const guessNationality = async (e) => {
    e.preventDefault();
    // clearing previous results
    setErrorAlert("");
    setResultJSX("");
    try {
      // getting the user's name based on ref's value
      const name = inputRef.current.value;
      // fetching nationalizeData based on user's input
      const nationalizeResponse = await fetch(
        `https://api.nationalize.io?name=${name}`
      );
      const nationalizeData = await nationalizeResponse.json();

      // error validation
      if (!nationalizeData.country || nationalizeData.country.length === 0) {
        setErrorAlert(
          <p id="error-alert">
            Sorry, this name is invalid, or unrecognised to the system.
          </p>
        );
        return;
      }

      // converting the probability to a percentage at 2DP
      const probabilityPercentage = Number(
        (nationalizeData.country[0].probability * 100).toFixed(2)
      );

      // converting the ISO code to country name using another API
      const countryCode = nationalizeData.country[0].country_id;
      const countriesResponse = await fetch(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/countries-codes/records?where=iso2_code%20%3D%20%22${countryCode}%22&limit=20`
      );
      const countriesData = await countriesResponse.json();
      console.log(countriesData);
      const countryLabel = countriesData.results[0].label_en;

      // displaying the result only once the data has been received
      setResultJSX(
        <>
          <h1 id="nationality">Your nationality is: {countryLabel}</h1>
          <h2 id="probability">
            With a probability of: {probabilityPercentage}%
          </h2>
        </>
      );
    } catch (e) {
      setErrorAlert(
        <p id="error-alert">
          An error ocurred while processing your request. Please try again.
        </p>
      );
      console.error(e);
    }
  };

  return (
    <>
      {resultJSX}
      <form id="input-form" onSubmit={guessNationality}>
        <p>Enter your name to estimate your nationality!</p>
        <input type="text" ref={inputRef} />
        <button id="submit-button">Submit</button>
      </form>
      {errorAlert}
    </>
  );
}
