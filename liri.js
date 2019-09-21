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
        if (error.response) {

            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });