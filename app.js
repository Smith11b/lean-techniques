"use strict";
const axios = require("axios");
const readline = require("readline-sync");

const main = (function app() {
  // wrapped in an IIFE so variables will not be global and I have free reign
  // in my name space. I chose modular programming here because this seemed like
  // a feature add. but also could have done this with OOP 
  // Executable Code---------------------------------------------------
  const runApp = (async function execute() {
    const res = await getPhotos(); // wait for photos to get back and resolve
    if(res){
    const lookup = createLookup(res.data);
    while (true) {
      var input = getInput();
      if (input === "e") break;
      checkInput(input, lookup);
    }}
  })();

  // End Executable Code-------------------------------------------------------

  // Function Definitions-----------------------------------------

  function getInput() {
    let input = readline.question(
      "Which album would you like to see? | i.e: photo-album 2 = the second album | press 'e' to Exit |\n"
    );
    return input;
  }

  function checkInput(input, lookup) {
    if (input === "e") {
      return;
    }
    let albumNum = input.split(" ")[1];
    if (lookup[albumNum] === undefined) {
      console.log("That's not a real album, please try again");
      return;
    }
    if (input === "photo-album " + albumNum.toString()) {
      for (let photo of lookup[albumNum]) {
        //console logged for each loop instead of just printing the array for formatting.
        console.log(`[${photo.id}] ${photo.title}`);
      }
      return;
    } else {
      console.log(
        "that's the incorrect format please use 'photo-album 'number'"
      );
      return;
    }
  }

  /* I'm not using this function, but if I were going to do a get request every time I got user input, I would get
     the url like this. store that in a url variable. then run the get request with that url instead.
     then console log the response the same as I did with my way. 
     If we found that we were scaling fast in the size of the dataset, but requests were low.
     I would do it this way intead, as it's easier to scale using sharding, load balancing etc.
     It's also faster to chunk the data into albums instead of using the single request I used in my solution. */

  function createURL(input) {
    if (input === "e") {
      return;
    }
    let albumNum = input.split(" ")[1];
    if (isNaN(+albumNum)) {
      console.log("that's not a real album, please try again");
      return;
    }
    return `https://jsonplaceholder.typicode.com/photos?albumId=${albumNum}`;
  }

  /* When the application is small, multiple small api calls
     will be ok, but if the application wants to scale it might be faster to
     only make a single api call and a single parse through the dataset. especially
     as in this case, the user will take at least a second in the beggining to
     think about which photo album to select, and won't notice the api call.
     The createLookup() flattens the data into a sort of hash table so any subsequent input from the user
     to search for albums will be made in O(1) or constant time. This would work at scale with caching */

  function createLookup(arr) {
    return arr.reduce((acc, photo) => {
      if (acc[photo.albumId] === undefined) {
        // check if the acc object has a property that matches the current objects property or not.
        acc[photo.albumId] = [
          { albumId: photo.albumId, id: photo.id, title: photo.title }
        ]; // if it doesn't, create a new property on acc that points to an array with an object of these properties
      } else {
        // otherwise, push a new object with current objects certain properties into the acc object's albumId array
        acc[photo.albumId].push({
          albumId: photo.albumId,
          id: photo.id,
          title: photo.title
        });
      }
      return acc;
    }, {});
  }

  async function getPhotos() {
    // here I would have this function take the url an use it in the axios if I was doing it with an api call each input
    const res = await axios.get("https://jsonplaceholder.typicode.com/photos")
    .catch(err => {
        console.log("Uh oh, something went wrong, the app will now exit. Please try again.")
    });
    return res;
  }

  return {
    test__Api: { app, getPhotos, getInput, checkInput, createLookup, runApp }
  };
  /* I returned it this way so that I could test each function via the test__Api, that would be nested within
   the public api, and used underscores to note that it should not be changed.
   this allows me to use main.test__Api.functionName in jest to unit test my functions. */
})();

module.exports = main;

