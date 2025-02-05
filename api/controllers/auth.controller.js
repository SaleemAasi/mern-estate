import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const Signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashPassword });

    try {
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        next(error);
    }
};

export const Signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        // Compare the input password with the hashed password in the database
        const isPasswordValid = bcrypt.compareSync(password, validUser.password);

        if (!isPasswordValid) {
            return next(errorHandler(401, 'Wrong credentials'));
        }

        // Remove password from the user object before sending the response
        const userWithoutPassword = validUser.toObject();
        delete userWithoutPassword.password;

        // Generate JWT token
        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET,  // Use environment variable for security
             // Token expires in 1 hour
        );

        // Send token in HTTP-only cookie
        res.cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
           .status(200)
           .json({ message: 'User signed in successfully', user: userWithoutPassword });
    } catch (error) {
        next(error);
    }
};
