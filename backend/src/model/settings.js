const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    visualLearning: Boolean,
    resultRangeFrom: Number,
    resultRangeTo: Number,
    divisor: Number
}, {
    collection: 'Settings'
})

const model = mongoose.model('SettingsSchema', SettingsSchema);

module.exports = model;

