const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', (req, res) => {
  res.render('index', {role : ''})
});

router.get('/login', function(req,res){
  if(req.session.user){
    res.redirect('/')
  }else {
    res.render('login', { msg: ''})
  }
})

router.post('/login', function(req,res){
  if(!req.body.username || !req.body.password)
  {
    res.send('Please enter username and password')
  }
  else
  {
    model.User.findOne({
      where: {
        username:req.body.username
      }
    })
    .then(function(data_user){
      if(data_user.password == req.body.password)
      {
          req.session.user = {
            username: req.body.username,
            role: data_user.role
          }
          if(data_user.role == 'teacher'){
            res.redirect('students')
          }else if (data_user.role == 'academic') {
            res.redirect('subjects')
          }else {
            res.redirect('teachers')
          }

      }else
      {
          res.send('Wrong Password')
      }
    })
    .catch(function(err){
      res.send('User Not Found')
    })
  }
})

router.get('/logout', function(req,res){
  req.session.destroy( err => {
    res.redirect('/');
  })
})

module.exports = router;
