require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var method = process.argv[2];
var input = process.argv[3]

var artist = method;

// axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
//     .then(function (res) {
//         console.log(res.data);
//     })
//     .catch(function (err) {
//         if (err.response) {

//             console.log(err.response.data);
//             console.log(err.response.status);
//             console.log(err.response.headers);
//         } else if (err.request) {
//             console.log(err.request);
//         } else {
//             console.log("Error", err.message);
//         }
//         console.log(err.config);
//     });

spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, res) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    console.log(res.tracks);
});