# My work with React and APIs

This projects sets out to showcase my ability to work with API's and async functions within react.

## Task 1 - Nationalize API

Within task-1, you'll find an auto-focusing input box that allows you to enter your surname.
It utilises the nationalize.io API in order to guess your country of origin, with a percentage of certainty.
I also decided to make use of openDataSoft's country codes API so that I could convert the iso2 codes provided by nationalize into country names.

## Task 2 - Weather API

Task 2 again utilises API functionality by allowing the user the both enter a location, or use their current location in order to display the weather.
For this, I experimented with a few new bits of css and now have a good hand on displaying data dynamically in components.

You'll also find that I've left a .env_sample file in the root directory.
This is where you can enter your API key for https://www.weatherapi.com/ and then remove the "\_sample" from the file name in order to enable functionality.

### Improvements

Doing this again, I'd definitely improve a few things.
For Example, if I'd have known about routing at the time of creating this, I'd have use routing for the task-1 and task-2 button functionality.
I'd also like to look more into weather APIs and how I might include a future forecast option, and more robust user features.
