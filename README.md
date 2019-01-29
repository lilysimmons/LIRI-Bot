# LIRI-Bot

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a CLI applcattion that uses node.js to take in parameters via the command line and gives you back data.  This LIRI bot searches Spotify for songs, Bands in Town for concerts, and OMDB for movies.

### Prerequisites

You will need to install several node packages to use this app

```
spotify, OMDB, Bands in Town, Moment.js, axios
```

### Installing

```
npm install...
```

example:  
```
npm install node-spotify-api
```

### USAGE

Navigate to the repository. In the command line, start the application by typing "node liri.js" into the command line and typing one of the for commands after "node liri.js."  Commands for LIRI are:

1. concert-this
2. spotify-this-song
3. movie-this
4. do-what-it-says

## How to enter the commands

* node liri.js concert-this `<band/artist name here>`
* node liri.js spotify-this-song `<song name here>`
* node liri.js movie this `<movie name here>`
* node liri.js do-what-it-says 

The "do-what-it-says" function does not need an additional argument, because it reads commands from the random.txt file.  The text file contains a "spotify-this-song" command, but you can add any of the commands above to the text file and LIRI will do what it says.


