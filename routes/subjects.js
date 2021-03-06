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

// router.get('/:id/enrolledstudents', (req, res, next) => {
//   let id = req.params.id
//   model.Subject.findOne({
//     where : { id : id }
//   })
//   .then(subject => {
//   model.Student.findAll()
//   .then(data_students => {
//     res.render('enrolledstudents', {subject : subject, data_students : data_students})
//   })
//   })
// })

router.get('/:id/enrolledstudents', (req, res, next) => {
  let id = req.params.id
  model.Subject.findOne({
    where : { id : id }
  })
  .then(subject => {
  model.StudentSubject.findAll({
    where : { 
      SubjectId : id 
  }, include : [model.Student],
    order : [['Student', 'first_name', 'ASC']]
  })
  .then(student_subject => {
    // console.log(JSON.stringify(student_subject, null,2));
    res.render('enrolledstudents', {subject : subject, student_subject : student_subject})
  })
  })
})


router.get('/:student_subject_id/givescore/:subject_id', (req, res, next) => {
  model.StudentSubject.findById(req.params.student_subject_id, {
    include : [{ all : true }]
  })
  .then(student_subject => {
    res.render('givescore', {student_subject : student_subject})
  })
})

router.post('/:student_subject_id/givescore/:subject_id', (req, res, next) => {
  model.StudentSubject.update({
    score : req.body.score
  },{
    where : {
      id : req.params.student_subject_id
    }
  })
  .then(() => {
    res.redirect(`/subjects/${req.params.subject_id}/enrolledstudents`)
  })
})


module.exports = router;
