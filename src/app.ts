import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import logger from 'morgan';


require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

export var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);




