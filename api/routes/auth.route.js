import express from 'express';
import { Signup,Signin,google } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup', Signup); // Use POST for user registration
router.post('/signin', Signin);
router.post('/google', google);

export default router;
