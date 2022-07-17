import mongoose, { Error } from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

mongoose.connect('mongodb+srv://stefan79:chenzehan789@cluster0.o79le5o.mongodb.net/?retryWrites=true&w=majority', {
}, (err: Error) => {
   if (err) throw err
})