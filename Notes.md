<h1>E-Business Software Technologies</h1>

[toc]

<h2>The MEAN Stack</h2>

This is a type of full stack (open source software stack) for building dynamic websites and web applications 

This consists of Mongo DB (database system), Express (back-end web framework), Angular.js (front-end framework), Node.js (back-end runtime environment)

<h3>Mongo DB</h3>
MongoDB is a NoSQL open-source, cross-platform document-oriented database program that JSON-like documents with schemas

<H3>Express</h3>

Express is a web application framework that runs on Node.js. This is a light-weight web application framework to organise web application into an MVC architecture on the server-side

<h3>Angular</h3>

A JavaScript MVC framework that run in-browser JavaScript engines. Angular is a structural framework for dynamic web applications. It lets you use HTML as your template language and enables you to extend HTML's syntax to express your application's components clearly and succinctly 

<h3>Node.js</h3>

An execution environment for event-driven server-side and networking applications



<h2>Node.js Fundamentals</h2>

<h3>Server.js structure</h3>

```js
let http = require('http');

http.createServer(function (request, response) {
  let url = request.url;
  console.log('request ', url)
  response.writeHead(200)

  switch (url) {
    case '/sem':
      response.write('Its S2 2021');
      break;
    case '/quiz':
      response.write('Workshop Quiz 2');
      break;
    default:
      response.write('Unknown pathname');
      break;
  }
  response.end();
}).listen(5678)
```

This is a general template example



To import built in package 'http'

```js
let http = require('http');
```

Turns computer into a HTTP server

```js
http.createServer(function (request, response)
```

Status code 200 means all is okay, 404 is page not found

```js
response.writeHead(200);
//or 
response.writeHead(404, {
    "Content-Type": "text/html",
});
```



<h3>URL structure</h3>

```
http://example.com/over/there?name=Tim&age=20
```

"http" : the protocol 

"example.com" : server address

"/over/there" : pathname

"name=Tim&age=20" : query string (anything after '?')



```js
var baseURL = "http://" + request.headers.host + "/";
    console.log(baseURL);
    var url = new URL(request.url, baseURL);
```

This is to split the url into its parts

```js
url.pathname
url.searchParams.get('d')
```

These are some properties of the url 



<h3>External Packages (.json files)</h3>

To import, code requires 'require' command 

```js
let url = require('url');
```

To create new package.json file need to run:

```
npm init
```

To add item to dependencies of the package.json file:

```
npm install express
```

This will:

- download and install item (express) into <u>node_modules</u> folder inside project
- add item (express) to the list of dependencies in package.json file



<h2>Express</h2>

Running a server of port 8080 on express:

```js
let express = require('express');
let app = express();
app.get("/", function(req,res,next) {// the "/" specifies pathname so we can do it multiple times for others
    res.send("Hello World");
}).listen(8080); // this can be at the start just as app.listen(8080);
```

This is almost the same as running with node.js but:

- we don't need to specify the repose headers
- we don't need to add a new line at the end of the string because the framework does it for us



note: express is scalable

<h3>Running server</h3>

To run the app we:

- Open the folder that contains the JS file 

- Open terminal 

- initialise npm package

  ```
  npm init
  ```

- install express package

  ```
  npm install express
  or 
  npm install express -save
  ```

- run application 

  ```
  node server.js
  ```

<h3>Routing in express.js</h3>

Same with node.js but also have string patterns:

- This will match acd and abcd

```js
app.get('/ab?cd', function (req, res) {
    res.send('ab?cd')
}) 
```

- This will match abcd, abbcd, abbbcd and so on

```js
app.get('/ab+cd', function (req, res) {
    res.send('ab+cd')
}) 
```

- This will match abcd, abxcd, abRANDOMcd, ab123cd, and so on

```js
app.get('/ab*cd', function (req, res) {
    res.send('ab*cd')
}) 
```

- This will match /abe and /abcde (so either with or without "cd" but must have "ab" and "e" in that order )

```js
app.get('/ab(cd)?e', function (req, res) {
    res.send('ab(cd)?e')
}) 
```



Route paths based on regular expression 

- This will match anything with "a"

```js
app.get(/a/, function (req, res) {
    res.send('/a/')
}) 
```

- This will match butterfly and dragonful, but not butterflyman, dragonflyman, and so on 

```js
app.get(/.*fly$/, function (req, res) {
    res.send('/.*fly$/')
}) 
```



<h3>
    Route Parameters
</h3>

The captured values are stored in req.params

```text
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: {"userId": "34", "bookId": "8989"}
```

This is implemented by:

```js
app.get('/delete/:userId2Delete', function (req, res) {
    console.log(req.params); //params are stored in the object 
    deleteUser(req.params.userId2Delete);
    res.send(generateList());
})
```

note: "-" and "." will split the params so

```js
/delete/:from-:to
```

will have ":from" and ":to"



<h3>Query String in Express</h3>

To get query string parameters use req.query e.g.

```js
let express = require('express');
let app = express();

app.listen(8080);
app.get('/', function (req, res) {
   console.log(req.query.name) 
});
```

and the request send was

```
http://localhost:8080/?name=Bob
```



<h3>Router-level middleware</h3>

For the sake of <b>separation of concern (SOC)</b> and maintainability, it is possible to separate the routes from the main js file using Express.Router.

To demonstrate this, we need two JS files, router.js and server.js:

```js
let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
    res.send('Welcome to FIT2095 Home Page');
});
router.get('/about', function (req, ress) {
    res.send('This page is about FIT2095');
});

//export this router 
module.exports = router;
```

and server.js:

```js
let express = require('express');
let app = express();

let router = require('./router.js');

//both router.js and server.js should be in the same directory
app.use('/', router);

app.listen(8080);
```

  
