let express = require('express');
let app = express();

let router = require('./router.js');
app.listen(8080);

app.use('/', router);