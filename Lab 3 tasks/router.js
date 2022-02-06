let express = require('express');
let router = express.Router();

//Database
let books = [];

//for home directory
router.get('/', function(req, res) {
    res.send('Home page');
});

//add book
router.get('/addbook', function(req, res) {
    //random 4 digit number
    newId = Math.floor(1000 + Math.random() * 9000);
    books.push({
        id: newId, 
        title: req.query.title,
        author: req.query.author,
        topic: req.query.topic,
        cost: req.query.cost
    });
    res.send(generateList());
});

router.get('/getallbooks', function(req,res) {
    res.send(generateList());
});

router.get('/deleteid/:id', function(req, res) {
    for (let i=0; i < books.length; i++) {
        if (books[i].id == req.params.id) {
            books.splice(i, 1);
        }
    }
    res.send(generateList());
});

router.get('/getbookstorevalue', function(req, res) {
    let sum = 0;
    for (let i=0; i < books.length; i++) {
        sum += parseInt(books[i].cost);
    }
    res.send("The total cost of the book store is $" + sum);
});

router.get('/booksinacategory', function(req, res) {
    let count = 0;
    for (let i=0; i < books.length; i++) {
        if (books[i].topic == req.query.category) {
            count++;
        }
    }
    res.send("Total no of books in database for the category is: " + count);
});



function generateList() {
    let st = "<b>ID    Title    Author    Topic    Cost</b></br>";
    for (let i=0; i < books.length; i++) {
        st += books[i].id + ' | ' + books[i].title + ' | ' + books[i].author + ' | ' + books[i].topic + ' | ' + books[i].cost + '</br>';
    }
    return st;
}


//export this router
module.exports = router;