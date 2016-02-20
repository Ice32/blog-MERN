/**
 * Created by Keno on 2/19/2016.
 */
"use strict";
var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var bodyParser = require("body-parser");

var app = express();
var db;

app.use(express.static("static"));
app.use(bodyParser.json());

app.get("/api/posts", function(req, res){
    db.collection("posts").find().toArray(function(err, docs){
        res.json(docs);
    })
});

app.post("/api/posts", function(req, res){
    let newPost = req.body;
    db.collection("posts").insertOne(newPost, function(error, result){
        if(error){
            return console.log(error);
        }
        res.sendStatus(200);

    });
});

app.delete("/api/posts", function(req, res){
    console.log(req.body);
    db.collection("posts").removeOne({_id:ObjectID(req.body.id)}, function(err, result){
        console.log(result);
        res.sendStatus(200);
    });
});

MongoClient.connect("mongodb://localhost:27017/postdb", function(err, dbConnection){
    db = dbConnection;
    app.listen(3000, function(){
        console.log("Listening on port 3000");
    });
});
