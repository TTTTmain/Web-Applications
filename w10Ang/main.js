const express = require('express');
const app = express();
const path = require('path');
const serverRouter = require('./src/dbBackEnd/ServerRouter');

app.use('/',express.static(path.join(__dirname,"dist/w10Ang")));
app.use('/',serverRouter);

// app.all('/*',(req,res)=>{
//     res.sendFile('index.html',{root:__dirname+'/dist/w10Ang'});
// })


app.listen(8080);
console.log(`Server is running at http://127.0.0.1:8080`);