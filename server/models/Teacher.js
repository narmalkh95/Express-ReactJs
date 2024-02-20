const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
     }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;