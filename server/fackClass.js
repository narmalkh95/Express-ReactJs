const mongoose = require('mongoose');
const Course = require('./models/Course');
const Group = require('./models/Group');
const Room = require('./models/Room');
const Teacher = require('./models/Teacher');
const Student = require('./models/Student');

async function generateMockData() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Create rooms
        const rooms = await Room.create([
            { name: 'B205' },
            { name: 'B206' },
            { name: 'B207' },
            { name: 'B208' },
            { name: 'B209' }
        ]);

        // Create teachers
        const teachers = await Teacher.create([
            { name: 'Poxosyan' },
            { name: 'Manukyan' },
            { name: 'Andrasyan' },
            { name: 'Ginosyan' },
            { name: 'Kirakosyan' }
        ]);

        // Create courses
        const courses = await Course.create([
            { name: 'Math' },
            { name: 'Science' },
            { name: 'English' }
        ]);

        // Create groups
        const groups = await Group.create([
            {
                name: 'Group 1',
                rooms: [rooms[0]._id],
                teachers: [teachers[0]._id],
                lessonSchedule: [
                    { dayOfWeek: 'Monday', timeSlot: '9:00-10:00' },
                    { dayOfWeek: 'Wednesday', timeSlot: '11:00-12:00' }
                ]
            },
            // Add more groups as needed
        ]);

        // Create students
        const students = await Student.create([
            { name: 'Student 1', group: groups[0]._id },
            { name: 'Student 2', group: groups[0]._id },
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