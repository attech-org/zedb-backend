import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import logRequest from "./middlewares/logRequests";
import session from 'express-session';

dotenv.config();
export const app = express();

app.use(logRequest)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
