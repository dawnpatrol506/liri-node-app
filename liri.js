require('dotenv').config();
const keys = require('./assets/javascript/keys');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const bandsInTown = require('./assets/javascript/bands-in-town');
const moment = require('moment');

let term = process.argv[2];
bandsInTown.apiCall(term, function (body) {
    if (body.length < 1) {
        console.log('No upcoming shows.\n');
    }
    else {
        console.log('\nUpcoming shows for ' + term);
        for(let i = 0; i < 5 && i < body.length; i++){
            console.log('Venue: ' + body[i].venue.name);
            console.log('Location: ' + body[i].venue.city + ', ' + body[i].venue.country);

            if (body[i].dateTime)
                console.log('Date: ' + body[i].dateTime + '\n');
            else
                console.log('Date: TBA')

            console.log('   --------------------   ');

        };
    }
});

