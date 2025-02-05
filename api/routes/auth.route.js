import express from 'express';
import { Signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', Signup); // Use POST for user registration

export default router;
