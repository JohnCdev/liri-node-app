require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var method = process.argv[2];
var input = process.argv.slice(3).join(" ");

//commands
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

readMethod();

function readMethod() {
    switch (method) {
        case 'concert-this':
            getBands();
            break;
        case 'movie-this':
            getMovies();
            break;
        case 'spotify-this-song':
            getSongs();
            break;
        case 'do-what-it-says':
            useFS();
            break;
        default:
            console.log("Command unrecognized")
    }
}

//Axios Bands in Town request
function getBands() {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + keys.other.bit)
        .then(function (res) {
            // console.log(res.data[0]);
            console.log(`
=/===========================================/=

Venue: ${res.data[0].venue.name}
Location: ${res.data[0].venue.city}, ${res.data[0].venue.country}
Date: ${moment(res.data[0].datetime).format('MM/DD/YYYY')}

=/===========================================/=
        `)
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
}

//Axios OMBD
function getMovies() {
    if (!input) {
        input = "Mr. Nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=" + keys.other.omdb)
        .then(function (res) {
            // console.log(res.data)
            console.log(`
=/===========================================/=

Title: ${res.data.Title}
Year: ${res.data.Year}
IMDB Rating: ${res.data.imdbRating}
RT Rating: ${res.data.Ratings[1].Value}       
Country: ${res.data.Country}       
Language: ${res.data.Language}       
plot: ${res.data.Plot}       
Actors: ${res.data.Actors}       

=/===========================================/=
        `)
        })
        .catch(function (err) {
            console.log(err)
        });
}

//Spotify api request
function getSongs() {
    if (!input) {
        input = "The Sign";
    }
    spotify.search({ type: 'track', query: input }, function (err, res) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(res.tracks.items[0])
        console.log(`
=/===========================================/=

Artist: ${res.tracks.items[0].artists[0].name}
Song: ${res.tracks.items[0].name}
Preview: ${res.tracks.items[0].preview_url}
Album: ${res.tracks.items[0].album.name}       

=/===========================================/=
        `)
    });
}

//FS read and re-run
function useFS() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var arrData = data.split(",")
        method = arrData[0]
        input = arrData[1]
        input = input.replace(/['"]+/g, '')
        console.log(`${method}    ${input}`)
        readMethod();
    });
}