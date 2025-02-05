import express from 'express';
import { Signup,Signin } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup', Signup); // Use POST for user registration
router.post('/signin', Signin);

export default router;
