# Photo Album Lookup Tool 
Built with readline-sync, Jest, Node.js, Axios, Javascript and love. Lot's of love.

## So what's it do?
Photo album lookup tool allows a user to use the console to lookup photo albums that are indexed by album number in a "database".

In order to use it correctly you must enter `photo-album "albumNumber"`with album number being the number of the album you want to select. 

### Things I ran into in the build.

**Size vs Speed**
The dataset contained 5000 items. They were objects made up of mostly strings and numbers. Because of this, I chose to make one large API call at the beginning of the app loading. Had this been actual images, depending on our resources, I still may have done it this way with a cache, but breaking it up into the smaller api calls may have been better.

I made this choice because the dataset was small (memory wise) and multiple API calls would slow the app down, especial if made in quick succession. I also wrote it the other way.

**Modular Pattern**
I used the modular pattern no classes, instead of oop, because this to me felt like a small feature add, and not something large that would require instances.

**Testing**
I used Jest to test the functions, but didn't get the coverage I wanted. I wanted to use mocks to run the async tests.

## To Run:
- You need Node.js installed. You can get that [here](https://nodejs.org/en/) follo the instructions to install node.js globally.
- Clone this repo
- Open up a bash terminal if you're on Mac, or a the shell terminal of your choice on Windows if you don't use bash.
- cd into the directory of the cloned repo, make sure you're in the folder that contains app.js
- In the terminal, run: `node app.js`
- That's it!!

## To watch or run the tests
With Jest installed run command: `jest` in your terminal. This will run all tests.

If you'd like to watch the tests, run command: `jest --watch`