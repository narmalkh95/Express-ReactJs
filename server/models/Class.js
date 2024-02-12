const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    room: {type: Number, required: true},
    teacher: {type: String, required: true},
    link: {type: String, required: false},
});

module.exports = mongoose.model('Class', classSchema);