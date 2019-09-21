require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");

var spotify = new Spotify(keys.spotify);

var method = process.argv[2];

axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (res) {
        console.log(res);
    })
    .catch(function (err) {
        if (err.response) {

            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log("Error", err.message);
        }
        console.log(err.config);
    });