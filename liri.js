require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var axios = require("axios");
// var inquirer = require("inquirer");
var bandsintown = require("bandsintown");
var omdb = require("omdb");
var moment = require('moment');

moment().format();
var action = process.argv[2];


var pick = function(action, functionData){
    switch (action) {
    case "movie-this":
        movie(functionData);
        break;

    case "concert-this":
        artist(functionData);
        break;

    case "spotify-this-song":
        song(functionData);
        break;

    case "do-what-it-says":
        says();
        break;
}




function song(functionData) {
    var spotify = new Spotify(keys.spotify);
    var name = functionData;
    var args = process.argv;
 
    for (var i = 3; i < args.length; i++) {
 
        if (i > 3 && i < args.length) {
            name = name + "+" + args[i];
        }
        else {
            name += args[i];
        }
    }
                spotify.search({ type: 'track', query: name, limit: 1}, function(err, data) {
                    if (err) {
                      return console.log('Error occurred: ' + err);
                    }
                    // console.log(name)
                    // console.log(data.tracks)
                    for (var key in data.tracks.items){
                        console.log(data.tracks.items[key].artists[0].name);
                        console.log(data.tracks.items[key].preview_url);
                        console.log(data.tracks.items[key].name);
                        console.log(data.tracks.items[key].album.name);
                        
                    }  
                    
                  });
                }


function artist() {
    var args = process.argv;
    var item = "";
    for (var i = 3; i < args.length; i++) {
 
        if (i > 3 && i < args.length) {
            item = item + "+" + args[i];
        }
        else {
            item += args[i];
        }
    }
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
    var movieChoice = "";
    var args = process.argv;
    for (var i = 3; i < args.length; i++) {
 
        if (i > 3 && i < args.length) {
            movieChoice = movieChoice + "+" + args[i];
        }
        else {
            movieChoice += args[i];
        }
    }
    
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

            
        }
    )
}

function says(){
// fs is a core Node package for reading and writing files

// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
 
  console.log(data);


 // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  pick(dataArr[0], dataArr[1]);

 })
}
}

pick(process.argv[2], process.argv[3]);

 



