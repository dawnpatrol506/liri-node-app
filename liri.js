require('dotenv').config();
const keys = require('./assets/javascript/keys');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const api = require('./assets/javascript/api');
const moment = require('moment');
const fs = require('fs');

let command = process.argv[2];
let search = process.argv[3];

function eventResponse(search) {
    api.bandsInTown(search, function (body) {
        if (body.length < 1) {
            console.log('No upcoming shows.\n');
        }
        else {
            console.log('\nUpcoming shows for ' + search + ': \n');
            for (let i = 0; i < 5 && i < body.length; i++) {
                console.log('Venue: ' + body[i].venue.name);
                console.log('Location: ' + body[i].venue.city + ', ' + body[i].venue.country);

                let eventDate = body[i].datetime.split('T')[0];
                eventDate = moment(eventDate, 'YYYY-MM-DD').format('MMM DD, YYYY');
                console.log(eventDate);

                if (eventDate)
                    console.log('Date: ' + eventDate + '\n');
                else
                    console.log('Date: TBA')

                console.log('   --------------------   ');

            };
        }
    });
}

function movieResponse(search) {
    api.omdb(search, function (body) {
        if (body.length < 1)
            console.log('\n\nNo results for ' + search);
        else {
            let movie = JSON.parse(body);
            console.log("\n\nTitle: " + movie.Title);
            console.log("Year: " + movie.Year);
            console.log("IMDB Rating: " + movie.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
            console.log("Country: " + movie.Country);
            console.log("Language: " + movie.Language);
            console.log("Plot: " + movie.Plot);
            console.log("Actors: " + movie.Actors);
        }
    });
}

function songResponse(search) {
    spotify.search({
        type: 'track',
        query: search,
        limit: 1
    },
        function (err, data) {
            if (err)
                console.log(err);
            else {
                data = data.tracks.items[0];
                console.log("\n\nArtist: " + data.artists[0].name);
                console.log("Song: " + data.name);
                console.log("Preview Link: " + data.preview_url);
                console.log("Album: " + data.album.name);
            }
        });
}

function doWhatItSays(command, search) {
    fs.readFile('random.txt', 'utf-8', function (err, data) {
        data = data.split('"');
        let command = data[0].split(',')[0];
        let search = data[1];
        commandPicker(command, search);
    });
}

function commandPicker(command, search) {
    switch (command) {
        case 'concert-this':
            search === undefined ? eventResponse('fleetwood mac') : eventResponse(search);
            break;
        case 'spotify-this-song':
            //Let's default to a good song instad of trash shall we?
            search === undefined ? songResponse('sultans of swing') : songResponse(search);
            break;
        case 'movie-this':
            search === undefined ? movieResponse('mr. nobody') : movieResponse(search);
            break;
        case 'do-what-it-says':
            doWhatItSays(command, search);
            break;
        default:
            console.log('Invalid Command');
    }
}

commandPicker(command, search);