const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');


//register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({succes: false, msg: 'Fallo al registrar el usuario'});
    }
    else {
      res.json({succes: true, msg: 'Usuario registrado!'});
    }
  })
});

router.post('/authenticate', (req, res, next) => {
  res.send('REGISTER');
});

module.exports = router;