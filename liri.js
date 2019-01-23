require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var axios = require("axios");
var inquirer = require("inquirer");
var bandsintown = require("bandsintown");
var omdb = require("omdb");
var moment = require('moment');
moment().format();
var action = process.argv[2];
var item = process.argv[3];

switch (action) {
    case "movie-this":
        movie();
        break;

    case "concert-this":
        artist();
        break;

    case "spotify-this-song":
        song();
        break;

    // case "do-what-it-says":
    //     says();
    //     break;
}


var token = "BQDv1z5TZcFtaexLD_sljPnGCRD05cn9sEErBn7AyNVmpJvcuWGyrBO83qZKbp1iW07sEgK1OHxL0yr8sJBtP1wDeAN0K_IrbdC4ymEybGvaLehZuPnSHyxeRHsGzqt7EsVBr"

function song(){
    var name = process.argv[3];
    var spotify = new Spotify(keys.spotify)

    // axios.get("https://api.spotify.com/v1/search?q=" + name +  process.env.SPOTIFY_ID).then(
    //         function (response) {
    //             console.log(response)
    //             console.log(song)

    //             console.log(process.env.SPOTIFY_ID);

                spotify.search({ type: 'track', query: name }, function(err, data) {
                    if (err) {
                      return console.log('Error occurred: ' + err);
                    }
                    // console.log(name)
                    // console.log(data.tracks)
                    for (var key in data.tracks.items){
                        console.log(data.tracks.items[key].artists[0].name);
                        console.log(data.tracks.items[key].preview_url);
                        console.log(data.tracks.items[key].album.name);
                        
                    }  
                    
                  });
                }


function artist() {
    axios.get("https://rest.bandsintown.com/artists/" + item + "/events?app_id=trilogy").then(
        function (response) {


            console.log(item + " is playing at: " + response.data[0].venue.name);
            console.log("This is located in: " + response.data[0].venue.city);

            var date = response.data[0].datetime;
            var momentTime = moment(date).format('MM/DD/YYYY')

            console.log("The date of the show is: " + momentTime);

            



        }
    )
}




function movie() {
    var movieChoice = process.argv[3];
    axios.get("http://www.omdbapi.com/?t=" + movieChoice + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            //title of the movie
            console.log("Title: " + response.data.Title);
            //year the movie came out
            console.log("Year: " + response.data.Year);
            //IMDB rating of the movie
            console.log("IMDB Rating: " + response.data.imdbRating);
            //rotten tomatoes rating of the movie
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            //country where the movie was produced
            console.log("Country: " + response.data.Country);
            //language of the movie
            console.log("Language: " + response.data.Language);
            //plot of the movie
            console.log("Plot: " + response.data.Plot);
            //actors in the movie
            console.log("Actors: " + response.data.Actors);

            console.log(process.env.SPOTIFY_ID);
        }
    )
}

