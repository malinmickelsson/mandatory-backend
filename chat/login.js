const express = require('express');
const app = express();
const fs = require('fs');

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

let users = [];


app.set('view engine', 'pug')


app.get('/', function (req, res) {
    res.render('index', { 
        title: 'My login', 
        message: 'Login:', 
        pusername: 'Username',  
        //prevusers: 'Previous users:',
        users: users,//användare som loggat in,
     })
        
});

//formulärdatan skickas som: application/x-www-form-urlencoded i postman
app.post('/user', (req, res) => {
    const body = req.body;
    console.log(req.body);

    let user = {
        username: body.username,
      };

      users.push(user);

      let jsonData = JSON.stringify(users);

    
    fs.writeFile("usernames.txt", jsonData, function (err) {
        if (err) {
            console.log(err);
        }
    });

      
      res.end( "inloggad"/* starta index.js */);
      console.log("users: " + users);
});


app.listen(3001)



//--> i index.pug:  // lista med användare
 /*
            p= prevusers
            ul
            each val in users
                li= val.username
            */