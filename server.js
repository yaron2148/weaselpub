// shani - dinosaurit plotoyadit
// arni is very noob
console.log(0);
var http = require('http');
var fs = require('fs');
var path = require('path');
const APP_PORT = process.env.APP_PORT || 3000;
const app = http.createServer(requestHandler);
//hi whats up?sdfnvm
app.listen(APP_PORT);
console.log(`?? HTTP Server running at ${APP_PORT}`)
//screateArea(1000);

// handles all http requests to the server
function requestHandler(request, response) {
  console.log(`?? Received request for ${request.url}`)
  // append /client to serve pages from that folder
  var filePath = './client' + request.url
  if (filePath == './client/') {
    // serve index page on request /
    filePath = './client/index.html'
  }
  var extname = String(path.extname(filePath)).toLowerCase()
  console.log(`?? Serving ${filePath}`)
  var mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  }
  var contentType = mimeTypes[extname] || 'application/octet-stream'
  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile('./client/404.html', function (error, content) {
          response.writeHead(404, { 'Content-Type': contentType })
          response.end(content, 'utf-8')
        })
      } else {
        response.writeHead(500)
        response.end('Sorry, there was an error: ' + error.code + ' ..\n')
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType })
      response.end(content, 'utf-8')
    }
  })
}
const io = require('socket.io')(app, {
  path: '/socket.io',
})

io.attach(app, {
  // includes local domain to avoid CORS error locally
  // configure it accordingly for production
  cors: {
    origin: 'http://localhost',
    methods: ['GET', 'POST'],
    credentials: true,
    transports: ['websocket', 'polling'],
  },
  allowEIO3: true,
})

// FILE: server.js

//...

// To save the list of users as id:username
var users = {};
// We want to save all the messages
var tmutza = {kvuim:{}, dvashek:{}, mishtar:{}};

io.on('connection', (socket) => {
  console.log('???? New socket connected! >>', socket.id)
  socket.emit('tmunat-matzav', tmutza);

  // handles new connection
  socket.on('new-connection', (data) => {
    // captures event when new clients join
    console.log(`new-connection event received`, data)
    // adds user to list
    users[socket.id] = data.username
    console.log('users :>> ', users)
    // emit welcome message event
    socket.emit('welcome-message', {
      user: 'server',
      message: `Welcome to this Socket.io chat ${data.username}. There are ${
        Object.keys(users).length
      } users connected`,
    });
  })

  // handles message posted by client
  socket.on('new-message', (data) => {
    console.log(`???? new-message from ${data.user}`);
    msgs.push(data);
    console.log(msgs);
    // broadcast message to all sockets except the one that triggered the event
    socket.broadcast.emit('broadcast-message', {
      user: users[data.user],
      message: data.message,
    })
  });
  });
function createSingleResource(r){
    let lat = Math.random()*Math.PI;
    let lon = Math.random()*2*Math.PI;
    let rad = Math.random()*(0.09*r)+(0.01*r);
    return { lat:lat, lon:lon, rad:rad };
}
function createSetOfResources(r){
    let halfArea = 2*Math.PI*r*r;
    let totalSquare = 0;
    let res = [];
    do {
       let newRes = createSingleResource(r);
       totalSquare = totalSquare + (Math.PI * newRes.rad * newRes.rad);
    }
    while (totalSquare < halfArea);
    return res;
}
let waterResources = createSetOfResources();
console.log(waterResources);