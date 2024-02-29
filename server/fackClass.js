const mongoose = require('mongoose');
const Course = require('./models/Course');
const Group = require('./models/Group');
const Room = require('./models/Room');
const Teacher = require('./models/Teacher');
const Student = require('./models/Student');
const ClassType = require('./models/ClassType');
const Role = require('./models/Role');
const User = require('./models/User');
const {ROLES, attendanceStatus} = require("./models/User");
const {availableWeekDays, availableTimeslots, toMomentWeekDays} = require('./constants/index')
const moment = require('moment');

async function generateMockData() {
    try {

        await mongoose.connect('mongodb://localhost:27017/mydb');

        const roles = await Role.find({});
        const rolesObj = {};
        roles.map(i => {rolesObj[i.name] = i.id})

        // Create rooms
        const rooms = await Room.create([
            { name: '5214' },
            { name: '5104' },
            { name: '5310' },
            { name: '5211' },
            { name: '5218' },
            { name: '5220' },
            { name: '5207ա' },
            { name: '2129' },
            { name: '5306' },
            { name: '5307' },
            { name: '9717' },
            { name: '2438' },
        ]);

        // Create teachers
        const teachersArr = [
            { username: 'Մկրտչյան Գ.', email: 'test@email.com1', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ամիրբեկյան Ն.', email: 'test@email.com2', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ուսեպյան Մ.', email: 'test@email.com3', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Հովհաննիսյան Է.', email: 'test@email.com4', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Համբարձումյան Ք.', email: 'test@email.com5', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Հարությունյան Լ.', email: 'test@email.com6', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Գանովիչ Տ.', email: 'test@email.com7', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Տոմեյան Գ.', email: 'test@email.com8', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Խեմչյան Ա.', email: 'test@email.com9', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Օբոյանցև Վ.', email: 'test@email.com10', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Մանուկյան Ա.', email: 'test@email.com11', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Մարկոսյան Մ.', email: 'test@email.com12', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Սարգսյան Ս.', email: 'test@email.com13', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ղազարյան Մ.', email: 'test@email.com14', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        ];

        const teachers = await User.insertMany(teachersArr);

        // // Create courses
        // const courses = await Course.create([
        //     { name: 'Course N1' },
        //     { name: 'Course N2' },
        //     { name: 'Course N3' }
        // ]);

        const classTypes = await ClassType.create([
            { name: 'Լաբ. 1'},
            { name: 'Լաբ. 2'},
            { name: 'Լաբ. 3'},
            { name: 'Լաբ. 4'},
            { name: 'Դաս.'},
            { name: 'Գործ. 1'},
            { name: 'Գործ. 2'},
            { name: 'ԿԱ 1'},
            { name: 'ԿԱ 2'},
        ])

        // Create students
        const studentsArr = [
            { username: 'Ուսանող Մկրտչյան Գ.', email: 'student@email.com1', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ուսանող Ամիրբեկյան Ն.', email: 'student@email.com2', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ուսանող Ուսեպյան Մ.', email: 'student@email.com3', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ուսանող Հովհաննիսյան Է.', email: 'student@email.com4', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ուսանող Համբարձումյան Ք.', email: 'student@email.com5', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ուսանող Հարությունյան Լ.', email: 'student@email.com6', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ուսանող Գանովիչ Տ.', email: 'student@email.com7', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ուսանող Տոմեյան Գ.', email: 'student@email.com8', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ուսանող Խեմչյան Ա.', email: 'student@email.com9', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ուսանող Օբոյանցև Վ.', email: 'student@email.com10', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ուսանող Մանուկյան Ա.', email: 'student@email.com11', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ուսանող Մարկոսյան Մ.', email: 'student@email.com12', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ուսանող Սարգսյան Ս.', email: 'student@email.com13', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ուսանող Ղազարյան Մ.', email: 'student@email.com14', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        ];

        const students = await User.insertMany(studentsArr);

        // Create groups
        const groups = await Group.create([
            {
                name: 'օպերացիոն համակարգեր',
                shortName: 'ՕՀ',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[0], teacher: [teachers[0]._id], room: rooms[1]._id, classType: classTypes[2]._id },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[1], teacher: [teachers[0]._id], room: rooms[2]._id, classType: classTypes[0]._id },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[1], teacher: [teachers[0]._id], room: rooms[1]._id, classType: classTypes[1]._id },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[3], teacher: [teachers[1]._id], room: rooms[2]._id, classType: classTypes[3]._id },
                    { dayOfWeek: availableWeekDays.wednesday, timeSlot: availableTimeslots[0], teacher: [teachers[1]._id], room: rooms[3]._id, classType: classTypes[4]._id },
                ],
                students: [students[0]._id, students[1]._id]
            },
            {
                name: 'քոմփյութերային ցանցերի ծրագրավորում',
                shortName: 'ՔՑԾ',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[0], teacher: [teachers[9]._id], room: rooms[4]._id, classType: classTypes[1]._id },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[1], teacher: [teachers[9]._id], room: rooms[4]._id, classType: classTypes[3]._id },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[3], teacher: [teachers[9]._id], room: rooms[4]._id, classType: classTypes[0]._id },
                    { dayOfWeek: availableWeekDays.wednesday, timeSlot: availableTimeslots[1], teacher: [teachers[11]._id], room: rooms[3]._id, classType: classTypes[4]._id },
                    { dayOfWeek: availableWeekDays.wednesday, timeSlot: availableTimeslots[3], teacher: [teachers[9]._id], room: rooms[4]._id, classType: classTypes[2]._id },
                ],
                students: [students[2]._id, students[3]._id]
            },
            {
                name: 'օբյեկտ կողմնորոշված ծրագրավորում',
                shortName: 'ՕԿԾ',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.thursday, timeSlot: availableTimeslots[0], teacher: [teachers[4]._id], room: rooms[8]._id, classType: classTypes[2]._id },
                    { dayOfWeek: availableWeekDays.thursday, timeSlot: availableTimeslots[0], teacher: [teachers[4]._id], room: rooms[8]._id, classType: classTypes[0]._id },
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[0], teacher: [teachers[4]._id], room: rooms[8]._id, classType: classTypes[4]._id },
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[0], teacher: [teachers[4]._id], room: rooms[8]._id, classType: classTypes[1]._id },
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[1], teacher: [teachers[4]._id], room: rooms[9]._id, classType: classTypes[4]._id },
                ],
                students: [students[4]._id, students[5]._id]
            },
            {
                name: 'ծրագրերի թեստավորում',
                shortName: 'ԾԹ',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[0], teacher: [teachers[3]._id], room: rooms[3]._id, classType: classTypes[0]._id },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[1], teacher: [teachers[3]._id], room: rooms[3]._id, classType: classTypes[2]._id },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[2], teacher: [teachers[3]._id], room: rooms[4]._id, classType: classTypes[4]._id },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[3], teacher: [teachers[3]._id], room: rooms[3]._id, classType: classTypes[1]._id },
                    { dayOfWeek: availableWeekDays.wednesday, timeSlot: availableTimeslots[2], teacher: [teachers[3]._id], room: rooms[3]._id, classType: classTypes[2]._id },
                    { dayOfWeek: availableWeekDays.thursday, timeSlot: availableTimeslots[2], teacher: [teachers[3]._id], room: rooms[3]._id, classType: classTypes[3]._id },
                    { dayOfWeek: availableWeekDays.thursday, timeSlot: availableTimeslots[2], teacher: [teachers[3]._id], room: rooms[3]._id, classType: classTypes[3]._id },
                ],
                students: [students[6]._id, students[7]._id]
            },
            {
                name: 'ՔՊ և ԱԻՀ',
                shortName: 'ՔՊ և ԱԻՀ',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.tuesday, timeSlot: availableTimeslots[0], teacher: [teachers[12]._id], room: rooms[7]._id, classType: classTypes[4]._id },
                    { dayOfWeek: availableWeekDays.tuesday, timeSlot: availableTimeslots[0], teacher: [teachers[12]._id], room: rooms[7]._id, classType: classTypes[6]._id },
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[3], teacher: [teachers[12]._id], room: rooms[11]._id, classType: classTypes[5]._id },
                ],
                students: [students[8]._id, students[9]._id]
            },
            {
                name: 'ԾՏ',
                shortName: 'ԾՏ',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.tuesday, timeSlot: availableTimeslots[1], teacher: [teachers[6]._id], room: rooms[6]._id, classType: classTypes[8]._id },
                    { dayOfWeek: availableWeekDays.thursday, timeSlot: availableTimeslots[2], teacher: [teachers[6]._id], room: rooms[6]._id, classType: classTypes[7]._id },
                ],
                students: [students[10]._id, students[11]._id]
            },
            {
                name: 'ճյուղի տնտես',
                shortName: 'ճյուղի տնտես',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[2], teacher: [teachers[13]._id], room: rooms[10]._id, classType: classTypes[4]._id },
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[3], teacher: [teachers[13]._id], room: rooms[10]._id, classType: classTypes[5]._id },
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[3], teacher: [teachers[13]._id], room: rooms[10]._id, classType: classTypes[6]._id },
                ],
                students: [students[12]._id, students[13]._id]
            },
        ]);

        await createFakeAttendanceListData(groups, students);

    } catch (error) {
        console.error('Error generating mock data:', error);
    } finally {
        mongoose.disconnect();
    }
}

const createFakeAttendanceListData = async(groups, students) => {
    try {
        // const uri = 'mongodb://localhost:27017/mydb';
        // await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        const studentsData = {};
        // studentId: [{
        // "dayOfWeek": 1,
        // "timeSlot": "9:30 - 10:50"
        // }]
        const startDate = moment('2024-01-01', 'YYYY-MM-DD').format('YYYY-MM-DD');
        const endDate = moment();
        const attendanceValues = Object.values(attendanceStatus);
        // const usersList = await User.find({}).populate('username').populate('role');
        // const studentsList = usersList.filter(i => i.role.name === ROLES.STUDENT);

        // console.log(groups)
        // console.log(students)
        //
        // groups.map(group => {
        //     const weekDaysStudentHaveLessons = [];
        //    group.lessonSchedule.map(lesson => {
        //
        //    });
        // });
        //
        students.map(student => {
            const studentLessonSchedule = groups.filter(group => group.students.includes(student._id))[0].lessonSchedule;

            studentsData[student._id] = studentLessonSchedule.map(i => {
                return {dayOfWeek: toMomentWeekDays[i.dayOfWeek], timeSlot: i.timeSlot}
            });
        })

        for (let m = moment(startDate); m.isBefore(endDate); m.add(1, 'days')) {
            const weekDay = m.day();
            if (weekDay === 0 || weekDay === 6 ) continue;

            for (const id of Object.keys(studentsData)) {
                const user = await User.findById(id);
                const studentLessons = studentsData[id];

                const lessonsForDay = studentLessons.filter(lesson => lesson.dayOfWeek === weekDay);

                for (const lesson of lessonsForDay) {
                    const attendanceObj = {
                        date: m.format('DD-MM-YYYY'),
                        timeSlot: lesson.timeSlot,
                        status: attendanceValues[Math.floor(Math.random() * 2)]
                    };

                    user.attendanceList.push(attendanceObj);
                }

                await user.save();
            }
        }

        console.log('Mock data generated successfully');
    } catch (err) {
        console.error('Error generating mock data in createFakeAttendanceListData:', err);
    }
}

generateMockData();