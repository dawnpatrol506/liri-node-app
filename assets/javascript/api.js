const req = require('request');
const key = require('./keys');

var api = {
    bandsInTown: function(artist, callback){
        url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + key.bandsInTown;
        req(url, function(err, res, body){
            if(err)
                console.log(err);
            else{
                body = JSON.parse(body);
                callback(body);
                return;
            ;}
        });

    },

    omdb: function(title, callback){
        url = "http://www.omdbapi.com/?apikey=" + key.omdbKey + "&t=" + title;

        req(url, function(err, res, body){
            if(err)
                console.log(err);
            else{
                callback(body);
            }
        })
    }

}

module.exports = api;