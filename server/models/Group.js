const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    shortName: {
        type: String,
        unique: true
    },
    lessonSchedule: [{
        dayOfWeek: {
            type: String,
         },
        timeSlot: {
            type: String,
         },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room'
        },
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    time: {
        type: String,
    }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;