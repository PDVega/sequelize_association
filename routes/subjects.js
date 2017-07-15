const express = require('express')
const router = express.Router()

const model = require('../models')

// router.get('/', (req, res)=>{
//   model.Subject.findAll().then(data =>{
//     res.render('subjects', {data_subjects : data})
//   })
// })

router.get('/', (req, res, next)=>{
  model.Subject.findAll({
    include : [model.Teacher]
  })
  .then(data =>{
      res.render('subjects', {data_subjects : data})
  })
})

router.get('/:id/enrolledstudents', (req, res, next) => {
  let id = req.params.id
  model.Subject.findOne({
    where : { id : id }
  })
  .then(subject => {
  model.Student.findAll()
  .then(data_students => {
    res.render('enrolledstudents', {subject : subject, data_students : data_students})
  })
  })
})


module.exports = router;
