const req = require('request');
const key = require('./keys');

var bandsInTown = {
    apiCall: function(artist, callback){
        url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + key.bandsInTown;
        req(url, function(err, res, body){
            if(err)
                console.log(err);
            else{
                body = JSON.parse(body);
                callback(body);
                return;
            }
        })

    }




}

module.exports = bandsInTown;