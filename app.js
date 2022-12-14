const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); //Permite hacer un request a nuestra api desde un nombre de dominio diferente
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./dbconfig/database');
var session = require('express-session');
var ip = require("ip");

//Connect to database
mongoose.connect('mongodb://equipo12:equipo12@172.16.130.61:27017/Proyecto', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => console.log('La base de datos esta conectada'))
  .catch(err => console.log(err))

const app = express();
const port = 8080;

const users = require('./routes/users');

//CORS Middleware
app.use(cors()); //Con esto se podran conectar desde cualquier lado

//Set static folder
app.use(express.static(path.join(__dirname, 'public'))); //En public irá todo0 el client side (angular). Cuando vayamos al / cargara el index.html de public

//Body Parser Middleware
app.use(bodyParser.json());

//Express session Middleware
app.use(session({
  secret: 'secreto secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

//ort Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./dbconfig/passport')(passport);


app.use('/users', users);
//Index Route
app.get('/api', (req, res) => {
  res.send('direccion invalida');
});

//Start Server
var server = app.listen(port, ip.address(), function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
