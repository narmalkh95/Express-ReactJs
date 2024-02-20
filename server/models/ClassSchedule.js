const Group = require('./Group');
const Room = require('./Room');
const Teacher = require('./Teacher');
const Student = require('./Student');

async function getClassSchedule() {
    try {
        const groups = await Group.find({})
            .populate('rooms')
            .populate('teachers')
            .populate('students');

        const schedule = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
        };

        groups.forEach(group => {
            group.lessonSchedule.forEach(lesson => {
                const { dayOfWeek, timeSlot } = lesson;

                const roomNames = group.rooms.map(room => room.name).join(', ');

                const teacherNames = group.teachers.map(teacher => teacher.name).join(', ');

                const studentNames = group.students.map(student => student.name);

                schedule[dayOfWeek].push({
                    groupName: group.name,
                    rooms: roomNames,
                    teachers: teacherNames,
                    students: studentNames,
                    timeSlot,
                });
            });
        });

        return schedule;
    } catch (error) {
        console.error('Error fetching class schedule:', error);
        return null;
    }
}

module.exports = { getClassSchedule };
