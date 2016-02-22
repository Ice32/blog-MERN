/**
 * Created by Keno on 2/19/2016.
 */
"use strict";
var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var bodyParser = require("body-parser");

var app = express();

//global variable to store the database connection
var db;

//serve static folder
app.use(express.static("static"));
app.use(bodyParser.json());

app.get("/api/posts", function(req, res){
    db.collection("posts").find().sort({dateCreated:-1}).toArray(function(err, docs){
        if(err){
            return console.error(err);
        }
        res.json(docs);
    })
});

app.post("/api/posts", function(req, res){
    let newPost = req.body;
    if(newPost.text.length > 2000 || newPost.title.length > 50){
        return res.sendStatus(400);
    }
    db.collection("posts").insertOne(newPost, function(error, result){
        if(error){
            return console.error(error);
        }
        res.sendStatus(200);
    });
});

app.delete("/api/posts", function(req, res){
    db.collection("posts").removeOne({_id:ObjectID(req.body.id)}, function(err, result){
        if(err){
            return console.error(err);
        }
        res.sendStatus(200);
    });
});

app.get("/api/posts/:id", function(req, res){
    db.collection("posts").find({_id:ObjectID(req.params.id)}).next(function(err, doc){
        if(err){
            console.error(err);
            res.sendStatus(400);
        }
        else{
            res.json(doc);
        }
    })
});

app.put("/api/posts/:id", function(req, res){
    let newPost = req.body;
    if(newPost.text.length > 2000 || newPost.title.length > 50 ){
        return res.sendStatus(400);
    }
    db.collection("posts").find({_id:ObjectID(req.params.id)}).next(function(err, doc){
        if(doc.title == req.body.title && doc.text == req.body.text){
            console.log("not changed");
            return res.sendStatus(304);
        }
        newPost.dateCreated = doc.dateCreated;
        db.collection("posts").updateOne({_id:doc._id},newPost);
        res.sendStatus(200);
    })
});

MongoClient.connect("mongodb://localhost:27017/postdb", function(err, dbConnection){
    db = dbConnection;
    app.listen(3000, function(){
        console.log("Listening on port 3000");
    });
});
