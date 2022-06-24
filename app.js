const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const axios = require('axios');

app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

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


foundData = [{name: "A", description: "B"}, {name:"C", description: "D"}]

app.get("/", function(req, res) {
    res.render("home", {data: foundData})
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
})