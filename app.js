
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const _ = require("lodash");
const ejs = require('ejs');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
  
});




app.post("/", function(req, res){

    let artist = req.body.artist;
    let songTitle = req.body.songTitle;

   

    let url = "https://api.lyrics.ovh/v1/"+ artist + "/" + songTitle;

https.get(url, function(response){



    response.on("data", function(data){

      

    let songLyrics = JSON.parse(data);
    
    
    res.render("lyrics", {
        artist: artist,
        songTitle: songTitle,
        songLyrics: songLyrics.lyrics
    })
    });
   
});
});



app.listen(3000, function(){
    console.log("Started server on port 3000");
});