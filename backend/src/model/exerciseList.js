const mongoose = require('mongoose');
const Exercise = require('./exercise');

const ExerciseListSchema = new mongoose.Schema({
    listName: {
        type: String,
        required: true,
        unique: true
    },
    data: [{
        numberOne: Number,
        numberTwo: Number,
        operation: String,
        result: Number
    }]
}, {
    collection: 'ExerciseLists'
})

const model = mongoose.model('ExerciseListSchema', ExerciseListSchema);

module.exports = model;