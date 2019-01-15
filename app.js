const readline = require('readline-sync');
const axios = require('axios');

axios.get("https://jsonplaceholder.typicode.com/photos")
.then(res => {
    var photos = res;
})
.catch(err => {
    console.log(err);
})

while (true){
    let album = readline.question("Which Album would you like to view? |example: photo-album 2 = the second album| Type 'e' to exit")
    let sub = album.slice(0, 12);
    let num  = Number(album[album.length -1]);
    console.log(sub)
    console.log(num)

    if(sub === "photo-album"){
        console.log("you did it!")
    }
}

