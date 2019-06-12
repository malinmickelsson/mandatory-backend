//Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 2).
let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);



//We define a route handler / that gets called when we hit our website home.
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Notice that I initialize a new instance of socket.io by passing the http (the HTTP server) object. 
//Then I listen on the connection event for incoming sockets, and I log it to the console.
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
});

/* --> connected & disconnected
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
*/

//In order to send an event to everyone, Socket.IO gives us the io.emit:
io.emit('some event', { for: 'everyone' });

//If you want to send a message to everyone except for a certain socket, we have the broadcast flag:
io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});

//In this case, for the sake of simplicity we’ll send the message to everyone, including the sender.
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//res.end(); 

//We make the http server listen on port 3001.
http.listen(3001, function(){
  console.log('listening on 3001 --> index.js');
});