import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';

dotenv.config(); // Load .env file

const app = express();

// Use environment variable
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use('/api/user', userRouter);

app.listen(3000, () => {
    console.log("🚀 Server is running on port 3000");
});
