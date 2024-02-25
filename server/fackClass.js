const mongoose = require('mongoose');
const Course = require('./models/Course');
const Group = require('./models/Group');
const Room = require('./models/Room');
const Teacher = require('./models/Teacher');
const Student = require('./models/Student');
const ClassType = require('./models/ClassType');
const {availableWeekDays, availableTimeslots} = require('./constants/index')

async function generateMockData() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

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
        const teachers = await Teacher.create([
            { name: 'Մկրտչյան Գ.' },
            { name: 'Ամիրբեկյան Ն.' },
            { name: 'Ուսեպյան Մ.' },
            { name: 'Հովհաննիսյան Է.' },
            { name: 'Համբարձումյան Ք.' },
            { name: 'Հարությունյան Լ.' },
            { name: 'Գանովիչ Տ.' },
            { name: 'Տոմեյան Գ.' },
            { name: 'Խեմչյան Ա.' },
            { name: 'Օբոյանցև Վ.' },
            { name: 'Մանուկյան Ա.' },
            { name: 'Մարկոսյան Մ.' },
            { name: 'Սարգսյան Ս.' },
            { name: 'Ղազարյան Մ.' },
        ]);

        // Create courses
        const courses = await Course.create([
            { name: 'Course N1' },
            { name: 'Course N2' },
            { name: 'Course N3' }
        ]);

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
                ]
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
                ]
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
                ]
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
                ]
            },
            {
                name: 'ՔՊ և ԱԻՀ',
                shortName: 'ՔՊ և ԱԻՀ',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.tuesday, timeSlot: availableTimeslots[0], teacher: [teachers[12]._id], room: rooms[7]._id, classType: classTypes[4]._id },
                    { dayOfWeek: availableWeekDays.tuesday, timeSlot: availableTimeslots[0], teacher: [teachers[12]._id], room: rooms[7]._id, classType: classTypes[6]._id },
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[3], teacher: [teachers[12]._id], room: rooms[11]._id, classType: classTypes[5]._id },
                ]
            },
            {
                name: 'ԾՏ',
                shortName: 'ԾՏ',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.tuesday, timeSlot: availableTimeslots[1], teacher: [teachers[6]._id], room: rooms[6]._id, classType: classTypes[8]._id },
                    { dayOfWeek: availableWeekDays.thursday, timeSlot: availableTimeslots[2], teacher: [teachers[6]._id], room: rooms[6]._id, classType: classTypes[7]._id },
                ]
            },
            {
                name: 'ճյուղի տնտես',
                shortName: 'ճյուղի տնտես',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[2], teacher: [teachers[13]._id], room: rooms[10]._id, classType: classTypes[4]._id },
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[3], teacher: [teachers[13]._id], room: rooms[10]._id, classType: classTypes[5]._id },
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[3], teacher: [teachers[13]._id], room: rooms[10]._id, classType: classTypes[6]._id },
                ]
            },
        ]);

        // Create students
        const students = await Student.create([
            { name: 'Student 1', group: groups[0]._id, course: courses[0]._id },
            { name: 'Student 2', group: groups[0]._id, course: courses[0]._id },
            // Add more students as needed
        ]);

        console.log('Mock data generated successfully');
    } catch (error) {
        console.error('Error generating mock data:', error);
    } finally {
        mongoose.disconnect();
    }
}

generateMockData();