const express = require('express')
const router = express.Router()

const model = require('../models')

router.get('/', (req, res)=>{
  model.Teacher.findAll().then(data =>{
    res.render('teachers', {data_teachers : data})
  })
})

module.exports = router;
