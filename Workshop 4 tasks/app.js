const express = require("express");
const app = express();

// your code goes here
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(function (req, res, next) {
    req.unitCode = "FIT2095";
    req.weekNumber = 4;
    next();
});
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//your code here

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// your code here
app.post("/findmax", function (req, res) {
    let maxVal = findMax(parseFloat(req.body.value1), parseFloat(req.body.value2));
    res.render("response.html", {maxValue: maxVal});
});


function findMax(value1, value2) {
    if (value1 > value2) {
        return value1;
    } else {
        return value2;
    }
}

app.listen(8080);