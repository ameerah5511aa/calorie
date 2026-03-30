const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Workout = require('./models/Workout');

async function checkData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('--- Checking MongoDB Data ---\n');

        const userCount = await User.countDocuments();
        const workoutCount = await Workout.countDocuments();

        console.log(`Total Users: ${userCount}`);
        console.log(`Total Workouts: ${workoutCount}`);

        console.log('\n--- Latest 3 Users ---');
        const users = await User.find().sort({ createdAt: -1 }).limit(3);
        users.forEach(u => console.log(`- Name: ${u.name} (Created: ${u.createdAt})`));

        console.log('\n--- Latest 3 Workouts ---');
        const workouts = await Workout.find().sort({ date: -1 }).limit(3);
        workouts.forEach(w => console.log(`- Exercise: ${w.exerciseName}, Calories: ${w.caloriesBurned}, Date: ${w.date}`));

    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    } finally {
        await mongoose.connection.close();
    }
}

checkData();
