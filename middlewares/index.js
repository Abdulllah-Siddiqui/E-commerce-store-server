import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

const ApplyMiddlewares = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded()); 
  app.use(cookieParser()); 
  app.use(express.static('public/images'));
  app.use(session({
    secret: 'ASDFGHJKLQWERTYUIOPZXCVBNM',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60
    }
  })
  );
  app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`);
    next();
  });

  app.use(passport.initialize());
  app.use(passport.session());
};

export default ApplyMiddlewares;
