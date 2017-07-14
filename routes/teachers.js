const express = require('express')
const router = express.Router()

const model = require('../models')

router.get('/', (req, res)=>{
  model.Teacher.findAll().then(data =>{
    res.render('teachers', {data_teachers : data})
  })
})

router.get('/add', (req, res, next) => {
  model.Teacher.findAll()
  .then(data => {
    res.render('add_teacher', {data_teachers : data, err:null })
  })
})

router.post('/add', (req, res, next) => {
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let email = req.body.email
  let SubjectId = req.body.SubjectId
    model.Teacher.create({
      'first_name':first_name,
      'last_name':last_name,
      'email':email,
      'SubjectId': SubjectId
      })
    .then((teacher) => {
      res.redirect('/teachers')
  })
  .catch((err)=>{
    res.render('add_teacher', {err:err.message});
  })
})


router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id
    model.Teacher.findOne({ where: {id : id}}).then(data_teachers => {
      res.render('edit_teacher', { data_teachers : data_teachers})
    })
});

router.post('/edit/:id', function(req, res, next) {
  let id = req.params.id
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let email = req.body.email
  let SubjectId = req.body.SubjectId
  model.Teacher.findById(id)
  .then(data_teachers => {
    data_teachers.update({
      'first_name': first_name, 
      'last_name':last_name,
      'email':email,
      'SubjectId':SubjectId})
    .then(() => {
      res.redirect('/teachers')
    })
    .catch((err)=>{
      res.render('add_teacher', {err:err.message});
    })
  })
});




router.get('/delete/:id', function(req, res, next) {
  let id = req.params.id
  model.Teacher.destroy({
    where: {
      'id': id
    }
  })
  .then(() => {
    res.redirect('/teachers')
  })
});



module.exports = router;
