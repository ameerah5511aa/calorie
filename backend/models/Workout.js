const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: { type: String, default: 'anonymous' },
    exerciseName: { type: String, required: true },
    caloriesBurned: { type: Number, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workout', workoutSchema);
