const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const axios = require('axios');

app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017", {useNewUrlParser: true})

const playerSchema = {
    account_id: Number,
    name: String,
    person_name: String,
    mmr: Number,
    avatar_full: String,
    team: String,
    rank: Number
}


players = [];

app.get("/", function(req, res) {
    axios.get("https://api.opendota.com/api/proPlayers").then((response) => {
        this.players = response.data;
        console.log("All players", this.players)
    })
    res.render("home", {data: players})
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
})