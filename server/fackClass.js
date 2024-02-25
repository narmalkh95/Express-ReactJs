const mongoose = require('mongoose');
const Course = require('./models/Course');
const Group = require('./models/Group');
const Room = require('./models/Room');
const Teacher = require('./models/Teacher');
const Student = require('./models/Student');

const availableTimeslots = ['9:30 - 10:50', '11:00 - 12:20', '12:50 - 14:10', '14:20 - 15:40'];

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
            { name: '5220' }
        ]);

        // Create teachers
        const teachers = await Teacher.create([
            { name: 'Մկրտչյան Գ.' },
            { name: 'Ամիրբեկյան Ն.' },
            { name: 'Ուսեպյան Մ.' },
            { name: 'Հովհաննիսյան Է.' },
            { name: 'Համբարձումյան Կ.' },
            { name: 'Հարությունյան Լ.' },
            { name: 'Գանովիչ Տ.' },
            { name: 'Տոմեյան Գ.' },
            { name: 'Խեմչյան Ա.' },
            { name: 'Օբոյանցև Վ.' },
            { name: 'Մանուկյան Ա.' }
        ]);

        // Create courses
        const courses = await Course.create([
            { name: 'Course N1' },
            { name: 'Course N2' },
            { name: 'Course N3' }
        ]);



        // Create groups
        const groups = await Group.create([
            {
                name: 'օպերացիոն համակարգեր',
                shortName: 'ՕՀ',
                lessonSchedule: [
                    { dayOfWeek: 'Monday', timeSlot: availableTimeslots[0], teacher: [teachers[0]._id], room: rooms[1]._id },
                    { dayOfWeek: 'Monday', timeSlot: availableTimeslots[1], teacher: [teachers[0]._id], room: rooms[2]._id },
                    { dayOfWeek: 'Monday', timeSlot: availableTimeslots[3], teacher: [teachers[1]._id], room: rooms[2]._id },
                ]
            },
            {
                name: 'քոմփյութերային ցանցերի ծրագրավորում',
                shortName: 'ՔՑԾ',
                lessonSchedule: [
                    { dayOfWeek: 'Monday', timeSlot: availableTimeslots[0], teacher: [teachers[9]._id], room: rooms[4]._id },
                    { dayOfWeek: 'Monday', timeSlot: availableTimeslots[1], teacher: [teachers[9]._id], room: rooms[4]._id },
                    { dayOfWeek: 'Monday', timeSlot: availableTimeslots[3], teacher: [teachers[9]._id], room: rooms[4]._id },
                ]
            },
            {
                name: 'օբյեկտ կողմնորոշված ծրագրավորում',
                shortName: 'ՕԿԾ',
            },
            {
                name: 'ծրագրերի թեստավորում',
                shortName: 'ԾԹ',
                lessonSchedule: [
                    { dayOfWeek: 'Monday', timeSlot: availableTimeslots[0], teacher: [teachers[3]._id], room: rooms[3]._id },
                    { dayOfWeek: 'Monday', timeSlot: availableTimeslots[1], teacher: [teachers[3]._id], room: rooms[3]._id },
                    { dayOfWeek: 'Monday', timeSlot: availableTimeslots[2], teacher: [teachers[3]._id], room: rooms[4]._id },
                    { dayOfWeek: 'Monday', timeSlot: availableTimeslots[3], teacher: [teachers[3]._id], room: rooms[3]._id },
                ]
            },
            {
                name: 'ՔՊ և ԱԻՀ',
                shortName: 'ՔՊ և ԱԻՀ',
            },
            {
                name: 'ԾՏ',
                shortName: 'ԾՏ',
            },
            {
                name: 'ճյուղի տնտես',
                shortName: 'ճյուղի տնտես',
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