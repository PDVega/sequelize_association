const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');


const index = require('./routes/index');
const teachers = require('./routes/teachers')
const subjects = require('./routes/subjects')
const students = require('./routes/student')

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index);
app.use('/teachers', teachers);
app.use('/subjects', subjects);
app.use('/students', students);

app.listen(3000)
