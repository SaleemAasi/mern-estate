import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';  // Only import once
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
            process.env.JWT_SECRET,  // Secret key from env variables
            { expiresIn: '1h' }      // Add expiry to the token
        );

        // Send token in HTTP-only cookie
        res.cookie('access_token', token, { httpOnly: true })
           .status(200)
           .json({ message: 'User signed in successfully', user: userWithoutPassword });
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    const { email, name } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            const { password, ...rest } = user._doc;

            res.cookie('access_token', token, { httpOnly: true })
               .status(200)
               .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashPassword = bcrypt.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: name.split(" ").join("").toLowerCase() + Math.random(),
                email,
                password: hashPassword,
            });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

            res.cookie('access_token', token, { httpOnly: true })
               .status(200)
               .json({ username: newUser.username, email: newUser.email });
        }
    } catch (error) {
        console.error('Error during Google Sign-In:', error);
        return next(errorHandler(500, 'Google authentication failed'));
    }
};
