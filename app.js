const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017", {useNewUrlParser: true})

app.get("/", function(req, res) {

})

app.listen(3000, function() {
    console.log("Server started on port 3000");
})