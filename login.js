const express = require('express');
const app = express();
const port = 3001;
let fs = require('fs');

//SOCKET
let http = require('http').createServer(app);
let io = require('socket.io')(http);



//MIDDLEWARE
app.use(express.json());

let users = require("./usernames.json");
const chatrooms = require("./chatrooms.json");






// LOGIN
//-----------------------------------
app.post('/users', (req, res) => {
  const body = req.body;
  console.log(req.body);

  let user = {
    username: body.username
  };

  users.push(user);

  let jsonUsernames = JSON.stringify(users);

  fs.writeFile("usernames.json", jsonUsernames, function (err) {
    if (err) {
      console.log(err);
    }
  });

  res.end("logged in as : " + user.username);
  console.log("users: " + users);
});

//-----------------------------------






// CHATROOMS
//-----------------------------------
app.get('/chatRoom', function (req, res) {
  res.send(chatrooms);
});


app.post('/chatRoom', function (req, res) {
  const chatroom = req.body
  console.log(chatroom);
  chatrooms.push(chatroom.id);
  console.log("pushed: " + chatroom);

  let jsonChatRoom = JSON.stringify(chatrooms);

  fs.writeFile("chatrooms.json", jsonChatRoom, function (err) {
    if (err) {
      console.log(err);
    }
  });

  res.end("chatroom-succes")
});


app.delete('/chatRoom/:id', function (req, res) {

  let id = req.params.id;

  res.end("chatroom-deleted")
});

//-----------------------------------






// SOCKET.IO
//-----------------------------------

//We define a route handler / that gets called when we hit our website home.
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/ChatRoom.jsx');
});

//Notice that I initialize a new instance of socket.io by passing the http (the HTTP server) object. 
//Then I listen on the connection event for incoming sockets, and I log it to the console.
io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});


//In this case, for the sake of simplicity we’ll send the message to everyone, including the sender.
io.on('connection', function (socket) {
  socket.on('message', function (msg) {
    console.log(msg);
    io.emit('data', msg);
  });
});


http.listen(port, () => console.log(`listening on port ${port}!`))