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
    persona_name: String,
    mmr: Number,
    avatar_full: String,
    team: String,
    rank: Number
}

const Player = mongoose.Model("Player", playerSchema);

app.get("/", function(req, res) {
    let players = [];
    axios.get("https://api.opendota.com/api/proPlayers").then((response) => {
        this.players = response.data;
        console.log("All players", this.players)
    })
    res.render("home", {data: players})
})

app.get("/player/:account_id", function(req, res) {
    let player = [];
    axios.get(`https://api.opendota.com/api/players/${req.params.account_id}`).then((response) => {
        this.player = response.data;
    })
    res.render("player", {data: player})
})

app.post("/player/:account_id", function(req, res) {
    let playerData = [];
    axios.get(`https://api.opendota.com/api/players/${req.params.account_id}`).then((response) => {
        this.playerData = response.data;
    })
    const player = new Player ({
        account_id: req.params.account_id,
        name: playerData.profile.name,
        persona_name: playerData.profile.personaname,
        mmr: playerData.mmr_estimate.estimate,
        avatar_full: playerData.profile.avatarfull,
        team: playerData.profile.account_id,
        rank: playerData.leaderboard_rank
    })
    player.save()
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
})