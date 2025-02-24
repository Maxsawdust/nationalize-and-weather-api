export default function validateInput(input) {
  // check for empty input.
  if (input.trim() === "") {
    throw new Error("Input cannot be empty.");
  }

  /* regex that makes sure the input starts with one or more letters;
     can contain unicode letters from any language;
     can only contain forms of punctuation AFTER at least one letter, allowing thinks like
     St. Louis, or New-York, if the user so wishes. */
  // .trim allows users to have spaces at start or end in case they've accidentally put them in
  if (!input.trim().match(/^[a-zA-Z\p{L}]+[\p{L}\s\-',\.]*$/u)) {
    throw new Error("Invalid location input.");
  }
}
