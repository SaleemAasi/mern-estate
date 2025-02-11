import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js'; // Fix import (removed curly braces)

dotenv.config(); // Load .env file

const app = express();

// Middleware to parse cookies and JSON
app.use(cookieParser());
app.use(express.json()); 

// Checkpoint: Log the app is starting
console.log("🔵 Starting the server...");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });

// Checkpoint: Confirm that MongoDB connection attempt has started
console.log("🔵 Trying to connect to MongoDB...");

// Use Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Checkpoint: Log that r outes have been attached
console.log("🔵 Routes for User, Auth, and Listing set up");

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

// Checkpoint: Log that error handler is in place
console.log("🔵 Global Error Handling Middleware attached");

// Start the server
app.listen(3000, () => {
    console.log("🚀 Server is running on port 3000");
});
