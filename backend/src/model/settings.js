const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    visualLearning: Boolean,
    resultRangeFrom: Number,
    resultRangeTo: Number
}, {
    collection: 'Settings'
})

const model = mongoose.model('SettingsSchema', SettingsSchema);

exports.module = model;