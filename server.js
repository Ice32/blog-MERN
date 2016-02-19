/**
 * Created by Keno on 2/19/2016.
 */
var express = require("express");
var MongoClient = require("mongodb").MongoClient;

var app = express();
var db;

app.use(express.static("static"));

app.get("/api/posts", function(req, res){
    db.collection("posts").find().toArray(function(err, docs){
        console.log(docs);
        res.json(docs);
    })
});

MongoClient.connect("mongodb://localhost:27017/postdb", function(err, dbConnection){
    db = dbConnection;
    app.listen(3000, function(){
        console.log("Listening on port 3000");
    });
});
