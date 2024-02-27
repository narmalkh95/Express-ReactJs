const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
 const Teacher = require("./models/Teacher");
const Student = require("./models/Student");
const Role = require("./models/Role");

const uri = 'mongodb://localhost:27017/mydb';

// Sample fake user data
const fakeUser = {
    username: 'fakeuser',
    email:'fake@gmail.com',
    password: 'fakepassword',
 };
const fakeTeacher = {
    name: 'fakeTeacher',
    email:'faketeacher@gmail.com',
    password: 'fakepassword',
 };
const fakeStudent = {
    name: 'fakeStudent',
    email:'fakestudent@gmail.com',
    password: 'fakepassword',
 };



async function createFakeUser() {
    try {
        // await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        const [adminRole, teacherRole, studentRole] = await Promise.all([
            Role.create({ name: 'Admin' }),
            Role.create({ name: 'Teacher' }),
            Role.create({ name: 'Student' })
        ]);

        const fakeUserWithRole = { ...fakeUser, role: adminRole._id };
        const fakeTeacherWithRole = { ...fakeTeacher, role: teacherRole._id };
        const fakeStudentWithRole = { ...fakeStudent, role: studentRole._id };

        const [user, teacher, student] = await Promise.all([
            User.create(fakeUserWithRole),
            User.create(fakeTeacherWithRole),
            User.create(fakeStudentWithRole)
        ]);

        console.log(`Fake user inserted with _id: ${user._id}`);
    } catch (error) {
        console.error('Error creating fake user:', error);
    } finally {
        mongoose.connection.close();
    }
}

createFakeUser();