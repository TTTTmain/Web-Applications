let express = require('express');
let app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

let db = [];

let viewsPath = __dirname + "/views/";

app.use(express.urlencoded({extended: true}));
app.use(express.static('images'));
app.use(express.static('css'));

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
    res.render("allbooks", {
        books: db,
    })
});

//list all books by title
app.get("/getlistbooktitle", function(req,res) {
    res.render("listbooktitle", {
        books: db,
    })
});


//POST requests
app.post("/postnewbook", function(req, res) {
    console.log(req.body);
    if (req.body.title.length < 3 || req.body.author.length < 3 || req.body.topic.length < 3 || parseFloat(req.body.cost) < 0) {
        let fileName = viewsPath + "invalid.html";
        res.sendFile(fileName);
    } else {
        db.push(req.body);
        res.render("allbooks", {
            books: db,
        })
    }
});


app.all("/*", function (req,res) {
    let fileName = viewsPath + "error.html";
    res.sendFile(fileName);
});

app.listen(8080);
