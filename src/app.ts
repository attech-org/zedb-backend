var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./db');

require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

db.connect(process.env.URL_STRING_DATABASE, "zedb", (err:any)=>{
    if (err) {
        return console.log(err)
    };
    app.listen(process.env.PORT_TO_DATABASE, function(){
        console.log('API app started');
    })
})

module.exports = app;
