const express = require('express');
const app = express();

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

let users = [];


app.set('view engine', 'pug')


app.get('/', function (req, res) {
    res.render('index', { 
        title: 'My login', 
        message: 'Login:', 
        pusername: 'Username',  
        ppass: 'Password',
        prevusers: 'Previous users:',
        users: users,//användare som loggat in,
     })
        
});

//formulärdatan skickas som: application/x-www-form-urlencoded i postman
app.post('/user', (req, res) => {
    const body = req.body;
    console.log(req.body);

    let user = {
        username: body.username,
        password: body.password,
      };

      users.push(user);

      res.end('Congratulations! You successfully logged in!');
      console.log("outside users: " + users);
});


app.listen(3000)
