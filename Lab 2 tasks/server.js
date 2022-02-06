
let http = require('http');
let fs = require('fs');
let url = require('url')
let fileName = 'index.html';

/**
 * 
 * @param {day} d 
 * @param {month} m 
 * @param {year} y 
 * @returns week number since August 3,2020; returns -1 if the input is before 3rd of August 2020
 */
 function getDaysDiff(d, m, y) {
    let returnValue = -1;
    let currentDay = new Date();
    currentDay.setDate(parseInt(d));
    currentDay.setMonth(parseInt(m) - 1); // months start from 0
    currentDay.setYear(parseInt(y));
    let firstDay = new Date("8/3/2020"); // first day in semester 2
    if (currentDay >= firstDay) {
        var diffDays = parseInt((currentDay - firstDay) / (1000 * 60 * 60 * 24)); //gives day difference 
        returnValue = (Math.floor(diffDays / 7) + 1);
    }
    return (returnValue);
}

http.createServer(function (request, response) {
    //console.log('request ', request.url);

    var baseURL = "http://" + request.headers.host + "/";
    console.log(baseURL);
    var url = new URL(request.url, baseURL);
    console.log(url.pathname)

    switch (url.pathname) {
        case '/':
            fileName = 'index.html';
            break;
        case '/assessments':
            fileName = 'assessments.html';
            break;
        case '/topics':
            fileName = 'topics.html';
            break;
        case '/help':
            fileName = 'help.html';
            break;
        case '/whichweek/':
            let params = url.searchParams;
            console.log(params);
            let value = getDaysDiff(params.get('d'),params.get('m'),params.get('y'));
            console.log(value);
            if (value == -1) {
                response.end("That date is invalid as it was before Augest 3rd");
            } else {
                response.end("we are on week " + value);
            }

            break;
        default:
            fileName = 'error.html';
            break;
    }
    fs.readFile(fileName, function (error, content) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(content, 'utf-8');
    });
}).listen(5050);

