const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/', (req, res, next) => {
  res.render('login')
})

router.post('/', (req, res, next) => {
  let username = req.body.username
  let password = req.body.password
  model.User.find({
    where : { username : username }
  })
  .then(user => {
    if(user.password == password){
      req.session.user = {
        username : username,
        role : user.role
      }
      res.redirect('/home')
    } else {
      res.send('Wrong Password')
    }
  })
  .catch(err => {
    res.send('User not found')
  })
})


module.exports = router;
