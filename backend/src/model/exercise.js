const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    numberOne: {
        type: Number,
        required: true
    },
    numberTwo: {
        type: Number,
        required: true
    },
    operation: {
        type: String,
        required: true
    },
    result: {
        type: Number,
        required: true
    }
}, {
    collection: 'Exercises'
})

const model = mongoose.model('ExerciseSchema', ExerciseSchema);

module.exports = model;