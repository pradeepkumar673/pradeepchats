import express from 'express';
import {Signup,login,logout} from '../controllers/auth.controllers.js';
const authRouter = express.Router();

authRouter.post('/signup',Signup);

authRouter.post('/login',login);
authRouter.get('/logout',logout);



export default authRouter;
