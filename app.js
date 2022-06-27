const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const axios = require('axios');

app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017", {useNewUrlParser: true})

const aboutContent = "Well I made this database for a project for Actualize. There was a lot of issues making this come together but I'm glad I stuck through with it. I used an API to get me all the data that you find on this application. I really enjoy playing Dota 2 and that's why I pursued making this database. Would I use this personally? Honestly no, because I'm not that interested in following players. That does not mean I'm not proud of my work though, I throughly enjoyed working on every piece of code despite all the headaches (ugh). Anyways, thank you for checking out this application and for reading this page. Now go back and look through this application some more!"

const playerSchema = {
    account_id: Number,
    name: String,
    persona_name: String,
    mmr: Number,
    avatar_full: String,
    team: String,
    rank: Number
}

const userSchema = {
  email: String,
  password: String,
  account_id: Number
}

const followingSchema = {
    user: {userSchema},
    player: {playerSchema}
}

const Player = mongoose.Model("Player", playerSchema);
const User = mongoose.Model("User", userSchema);
const Following = mongoose.Model("Following", followingSchema);

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
    const url = `https://api.opendota.com/api/players/${req.params.account_id}`
    axios.get(url).then((response) => {
        this.playerData = response.data;
    })
    const player = new Player ({
        account_id: req.params.account_id,
        name: playerData.profile.name,
        persona_name: playerData.profile.personaname,
        mmr: playerData.mmr_estimate.estimate,
        avatar_full: playerData.profile.avatarfull,
        team: axios.get(url + "/pros").then((response) => {return response.data[0].team_name}),
        rank: playerData.leaderboard_rank
    })
    player.save(function(err) {
        if (!err) {
            res.redirect("/");
        }
    })
})

app.get("/live", (req, res) => {
    let liveGamesNow = {};
    axios.get("https://api.opendota.com/api/live").then((response) => {
       this.liveGamesNow = response.data;
    })
    res.render("games", {content: liveGamesNow})
})

app.get("/contact", (req, res) => {
    res.render("contact", {content: contactContent})
})

app.get("/about", (req, res) => {
    res.render("about", {content: aboutContent})
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
})