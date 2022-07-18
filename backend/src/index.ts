import mongoose, { Error } from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import User from './User'
import dotenv from 'dotenv';

mongoose.connect('mongodb+srv://stefan79:chenzehan789@cluster0.o79le5o.mongodb.net/?retryWrites=true&w=majority', {
}, (err: Error) => {
   if (err) throw err
})

// Middleware
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.post('/register', async (req: Request, res: Response) => {

  const { username, password } = req.body
  if (!username || !passport || typeof username !== 'string' || typeof password !== 'string') {
    res.send('Invalid values!')
    return 
  } 
  User.findOne({ username }, async (err: Error, doc: string) => {
    if (err) throw err
    if (doc) res.send('User already exists')
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      // don't need to pass in the isAdmin because the default is set to false
      const newUser = new User({
        username,
        password: hashedPassword
      })
      await newUser.save()
      res.send('Registration sucessful!')
        }
  } )
  
})

app.listen(5000, () => {
  console.log('Server Started')
})