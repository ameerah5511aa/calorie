const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Workout = require('./models/Workout');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ Connection failed:', err);
    });

// --- Authentication Routes ---

// Signup Route
app.post('/api/users/signup', async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = new User({ name, password });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Login Route
app.post('/api/users/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name, password });
        if (user) {
            res.json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all users (for testing)
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- Workout Routes ---
app.get('/api/workouts', async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ date: -1 });
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/workouts', async (req, res) => {
    const workout = new Workout({
        exerciseName: req.body.exerciseName,
        caloriesBurned: req.body.caloriesBurned,
        duration: req.body.duration,
    });

    try {
        const newWorkout = await workout.save();
        res.status(201).json(newWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('Calorie App API is running ✅');
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
