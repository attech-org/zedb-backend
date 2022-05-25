import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import logRequest from "./middlewares/logRequests";

dotenv.config();
export const app = express();

app.use(logRequest)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);




