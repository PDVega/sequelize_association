const express = require('express')
const router = express.Router()

// router.get('/', (res, req)=>{
//   model.Teacher.findAll().then(data =>{
//     req.send(data)
//   })
// })

router.get('/', (req, res) => {
  res.render('index')
});

module.exports = router;
