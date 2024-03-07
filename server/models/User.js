const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: {
        type: String,
        unique: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    attendanceList: [{
        date: String,
        timeSlot: String,
        week: Number,
        status: String,
        lessonId: mongoose.Schema.Types.ObjectId
    }],
    lessons: [mongoose.Schema.Types.ObjectId]
});

const ROLES = {
    ADMIN: "Admin",
    TEACHER: "Teacher",
    STUDENT: 'Student'
}

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});


module.exports = mongoose.model('User', userSchema);
module.exports.ROLES = ROLES;
module.exports.attendanceStatus = {
    inTime: 'InTime',
    late: 'Late',
    acceptable: 'Acceptable'
};