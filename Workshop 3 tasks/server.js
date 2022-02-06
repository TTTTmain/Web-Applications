let express = require('express');
let app = express();

app.listen(8080);

app.get('/week3/marks/:prerq/:wsq/:lab', function (req, res) {
    console.log(req.params); 
    let weekMark = req.params.prerq*0.1 + req.params.wsq*0.1 + req.params.lab*0.2;
    res.send("Week 3 Mark is " + weekMark);
})

app.get("/week3*", function(req,res) {
    res.send("Welcome to week 3");
});
