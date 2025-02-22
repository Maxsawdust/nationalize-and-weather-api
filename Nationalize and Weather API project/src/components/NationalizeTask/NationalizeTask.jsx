import { useRef, useState, useEffect } from "react";

export default function NationalizeTask() {
  // using ref to get the input element
  const inputRef = useRef(null);
  // using state to store the nationality and probability
  const [nationality, setNationality] = useState("");
  // using effect to focus the input on render
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // function called on form submit
  const guessNationality = async (e) => {
    e.preventDefault();
    // getting the user's name based on ref's value
    const name = inputRef.current.value;
    // fetching nationalizeData based on user's input
    const nationalizeResponse = await fetch(
      `https://api.nationalize.io?name=${name}`
    );
    const nationalizeData = await nationalizeResponse.json();

    // converting the probability to a percentage at 2DP
    const probabilityPercentage = Number(
      (nationalizeData.country[0].probability * 100).toFixed(2)
    );

    // convering the ISO code to country name using another API
    const countryCode = nationalizeData.country[0].country_id;
    const countriesResponse = await fetch(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/countries-codes/records?where=iso2_code%20%3D%20%22${countryCode}%22&limit=20`
    );
    const countriesData = await countriesResponse.json();
    const countryLabel = countriesData.results[0].label_en;

    // using the setter to store the user's nationality in an object
    setNationality({
      country: countryLabel,
      probability: probabilityPercentage,
    });
  };

  return (
    <>
      <h1 id="nationality">Your nationality is: {nationality.country}</h1>
      <h2 id="probability">
        With a probability of: {nationality.probability}%
      </h2>

      <form id="input-form" onSubmit={guessNationality}>
        <p>Enter your name to estimate your nationality!</p>
        <input type="text" ref={inputRef} />
        <button id="submit-button">Submit</button>
      </form>
    </>
  );
}
