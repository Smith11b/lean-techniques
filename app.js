"use strict"
const axios = require("axios");
const readline = require('readline-sync')

const main = (function init() {   // wrapped in a self calling function so variables will not be global

    // Executable Code---------------
    (async function execute(){
        const res = await getPhotos();  // wait for photos to get back and resolve
        const lookup = createLookup(res.data); // flatten data into lookup
        while(true){
            let input = readline.question("Which album would you like to see? | i.e: photo-album 2 = the second album | press 'e' to Exit |")
            let albumNum = // I need to use substring here. or split into an array then use the plus uniary operator
            console.log(albumNum)
            if(input === "e"){
                break;
            }
            if (input === "photo-album " + albumNum.toString){
                console.log(lookup[albumNum]);
            } else if(lookup[albumNum]=== undefined){
                console.log("That's not a real album, please try again")
            }
        }
    })();
        




    
    
    
    
    // Functions Definitions-----------------------------------------


    // Here I'll do it both ways, when the application is small, multiple small api calls
    // will be ok, but if the application wants to scale it might be faster to
    // only make a single api call and a single parse through the database. especially
    // as in this case, the user will take at least a second in the beggining to
    // think about which photo album to select, and won't notice the api call.
    // the createLookup() flattens the data into a hash map so any subsequent input from the user
    // will be made in O(1) or constant time.
    
     function createLookup(arr) {
        return arr.reduce((acc, photo) => {
          if (acc[photo.albumId] === undefined) {    // check if the acc object has a property that matches the current objects property or not.
            acc[photo.albumId] = [{ albumId: photo.albumId, id: photo.id, title: photo.title }];   // if it doesn't, create a new property on acc that points to an array with an object of these properties
          } else {                                  // otherwise, push a new object with current objects  certain properties into the acc object's album Id array
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
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/photos"
    );
    return res;
    

  }
 
  return {test__Api: {init, getPhotos}}; 
  // I returned it this way so that I could test each function via the test__Api, that would be nested within
  // the public api, and used underscores to note that it should not be changed.
  // this allows me to use main.test__Api.functionName in jest to unit test my functions. 
})();

module.exports = main;
