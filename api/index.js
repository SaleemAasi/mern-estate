import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'; // Fix import (removed curly braces)

dotenv.config(); // Load .env file

const app = express();

app.use(express.json()); // Middleware to parse JSON

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
app.use(express.json())
// Use Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.listen(3000, () => {
    console.log("🚀 Server is running on port 3000");
});
