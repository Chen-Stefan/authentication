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
import { UserInterface } from './interfaces/UserInterface.';

const LocalStrategy = passportLocal.Strategy

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
// Passport
passport.use(new LocalStrategy((username: string, password: string, done) => {
  User.findOne({ username: username }, (err, user: any) => {
    if (err) throw err;
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, (err, result: boolean) => {
      if (err) throw err;
      if (result === true) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
})
);

passport.serializeUser((user: DatabaseUserInterface, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
  User.findOne({ _id: id }, (err, user: DatabaseUserInterface) => {
    const userInformation: UserInterface = {
      username: user.username,
      isAdmin: user.isAdmin,
      id: user._id
    };
    cb(err, userInformation);
  });
});


// Routes
app.post('/register', async (req: Request, res: Response) => {

  const { username, password } = req.body
  if (!username || !passport || typeof username !== 'string' || typeof password !== 'string') {
    res.send('Invalid values!')
    return 
  } 
  User.findOne({ username }, async (err: Error, doc: UserInterface) => {
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

app.post('/login', passport.authenticate('local', (req, res) => {
  res.send('Authentication Successful')
}))

app.listen(5000, () => {
  console.log('Server Started')
})