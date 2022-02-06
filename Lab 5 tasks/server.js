const express = require('express');
const mongodb = require('mongodb');
const morgan = require('morgan')
const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.urlencoded({extended: true}));
app.use(express.static('images'));
app.use(express.static('css'));
app.use(morgan("common"));

const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/";

let viewsPath = __dirname + "/views/";
let db;
MongoClient.connect(url, { useNewUrlParser: true}, function (err, client) {
    if (err) {
        console.log("Err ", err);
    } else {
        console.log("Connection Successful");
        db = client.db("library");
    }
});

//homepage
app.get('/', function(req, res) {
    let fileName = viewsPath + "index.html";
    res.sendFile(fileName);
});

//add new book
app.get("/getaddbook", function(req,res) {
    let fileName = viewsPath + "addbook.html";
    res.sendFile(fileName);
});

//list all books
app.get("/getallbooks", function(req,res) {
    db.collection("books").find({}).toArray(function (err, data) {
        res.render("allbooks", {books: data});
    });
});

//list all books
app.get("/showbydate", function(req,res) {
    let filter = { published: {$gte: new Date("08/27/2020"), $lte: new Date("08/27/2021")} };
    db.collection("books").find(filter).toArray(function (err, data) {
        if (err) throw err;
        res.render("showbydate", {books: data});
    });
});

//delete books by topic
app.get("/deletebytopic", function (req, res) {
    let fileName = viewsPath + "deletebytopic.html";
    res.sendFile(fileName)
});

//update book by title
app.get("/updatebytitle", function (req, res) {
    let fileName = viewsPath + "updatebytitle.html";
    res.sendFile(fileName);
});

//POST requests
app.post("/postnewbook", function(req, res) {
    console.log(req.body);
    if (req.body.title.length < 3 || req.body.author.length < 3 || req.body.topic.length < 3 || parseFloat(req.body.cost) < 0) {
        let fileName = viewsPath + "invalid.html";
        res.sendFile(fileName);
    } else {
        let book = req.body;
        let publishedDate = new Date(book.published);
        db.collection("books").insertOne({
            title: book.title,
            author: book.author,
            topic: book.topic,
            published: publishedDate,
            summary: book.summary,
        })
        
        res.redirect("/getallbooks");
    }
});

app.post("/deletebytopicdata", function (req, res) {
    let book = req.body;
    let filter = { topic: req.body.topic };
    db.collection("books").deleteMany(filter, function (err, obj) {
        console.log(obj.result);
    });
    res.redirect("/getallbooks");
});

app.post("/updatebytitledata", function (req, res) {
    let book = req.body;
    let publishedDate = new Date(book.published);
    let filter = { title: book.title };
    let updateData = {
        $set: {
            author: book.author,
            topic: book.topic,
            published: publishedDate,
            summary: book.summary,
        },
    };
    db.collection("books").updateOne(filter, updateData);
    res.redirect("/getallbooks");
});


app.all("/*", function (req,res) {
    let fileName = viewsPath + "error.html";
    res.sendFile(fileName);
});

app.listen(8080);
