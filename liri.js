require('dotenv').config();
const keys = require('./assets/javascript/keys');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const api = require('./assets/javascript/api');
const moment = require('moment');

let term = process.argv[2];
// api.bandsInTown(term, function (body) {
//     if (body.length < 1) {
//         console.log('No upcoming shows.\n');
//     }
//     else {
//         console.log('\nUpcoming shows for ' + term);
//         for(let i = 0; i < 5 && i < body.length; i++){
//             console.log('Venue: ' + body[i].venue.name);
//             console.log('Location: ' + body[i].venue.city + ', ' + body[i].venue.country);

//             if (body[i].dateTime)
//                 console.log('Date: ' + body[i].dateTime + '\n');
//             else
//                 console.log('Date: TBA')

//             console.log('   --------------------   ');

//         };
//     }
// });

api.omdb(term, function(body){
    if(body.length < 1)
        console.log('No results for ' + term);
    else{
        let movie = JSON.parse(body);
        console.log("Title: " + movie.Title);
        console.log("Year: " + movie.Year);
        console.log("IMDB Rating: " + movie.imdbRating);
        console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
        console.log("Country: " + movie.Country);
        console.log("Language: " + movie.Language);
        console.log("Plot: " + movie.Plot);
        console.log("Actors: " + movie.Actors);
    }
});