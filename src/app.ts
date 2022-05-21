import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';


import dotenv from 'dotenv';
dotenv.config();

import {
    router as indexRouter
} from './routes/index';

import {
    router as usersRouter
} from './routes/users';

export const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);




