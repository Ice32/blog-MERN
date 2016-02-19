/**
 * Created by Keno on 2/19/2016.
 */
var express = require("express");

var app = express();

app.use(express.static("static"));

app.listen(3000, function(){
    console.log("Listening on port 3000");
});