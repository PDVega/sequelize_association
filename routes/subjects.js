const express = require('express')
const router = express.Router()

const model = require('../models')

router.get('/', (req, res)=>{
  model.Subject.findAll().then(data =>{
    res.render('subjects', {data_subjects : data})
  })
})

module.exports = router;
