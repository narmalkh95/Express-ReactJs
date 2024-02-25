const Group = require('./Group');
const Room = require('./Room');
const Teacher = require('./Teacher');
const Student = require('./Student');

async function getClassSchedule() {
    try {
        const groups = await Group.find({})
            .populate('lessonSchedule.teacher')
            .populate('lessonSchedule.room')
            // .populate('teachers')
            // .populate('students');

        const schedule = {
            Monday: {},
            Tuesday: {},
            Wednesday: {},
            Thursday: {},
            Friday: {},
        };

        groups.forEach(group => {
            group.lessonSchedule.forEach(lesson => {
                const { dayOfWeek, timeSlot, teacher, room } = lesson;

                // const teacherNames = group.teachers.map(teacher => teacher.name).join(', ');

                // const studentNames = group.students.map(student => student.name);

                const obj = {
                    groupName: group.shortName,
                    room: room.name,
                    teacher: teacher.name,
                    // timeSlot,
                    // students: studentNames,
                };

                if (schedule[dayOfWeek][timeSlot]) {
                    schedule[dayOfWeek][timeSlot].push(obj)
                } else {
                    schedule[dayOfWeek][timeSlot] = [obj]
                }
            });
        });
        return schedule;
    } catch (error) {
        console.error('Error fetching class schedule:', error);
        return null;
    }
}

module.exports = { getClassSchedule };
