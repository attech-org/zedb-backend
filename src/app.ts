import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import logRequest from "./middlewares/logRequests";
import session from 'express-session';
//import passport from './helpers/google';

import passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth'

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
let userProfile: any;
app.set('view engine', 'ejs');
app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

app.use(passport.initialize());
app.use(passport.session());

const GoogleStrategy = OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;


passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/users/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        
        userProfile = profile;
        return done(null, userProfile);
    }
));



