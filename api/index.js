
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'; // Fix import (removed curly braces)

dotenv.config(); // Load .env file

const app = express();
app.use(cookieParser())
app.use(express.json()); // Middleware to parse JSON

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Use Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(3000, () => {
    console.log("🚀 Server is running on port 3000");
});
