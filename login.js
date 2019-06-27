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
let messages = require("./messages.json");





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

  res.end();
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

  //let id = req.params.id;

  res.end("chatroom-deleted")
});

//-----------------------------------






// SOCKET.IO
//-----------------------------------
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/ChatRoom.jsx');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});


io.on('connection', function (socket) {
  socket.on('message', function (msg) {
    console.log(msg);
    io.emit('data', msg);

    //spara meddelandena här:
    //-----------------------------------
    console.log(msg);
    messages.push(msg.content);
    console.log("pushed: " + msg);   // TypeError: messages.push is not a function
    console.log(messages);

    //let jsonMessages = messages;
    let jsonMessages = JSON.stringify(messages); 

    fs.writeFile("messages.json", jsonMessages, function (err) {
      if (err) {
        console.log(err);
      }
    });    
    
  });
});


// PORT
//-----------------------------------
http.listen(port, () => console.log(`listening on port ${port}!`))