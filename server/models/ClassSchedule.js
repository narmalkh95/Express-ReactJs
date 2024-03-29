const Group = require('./Group');
const Room = require('./Room');
const User = require('./User');
const Student = require('./Student');
const ClassTypes = require('./ClassType');
const {ro} = require("faker/lib/locales");
const {availableWeekDays, availableTimeslots} = require('../constants/index')
const Role = require("./Role");
const {ROLES} = require("./User");

async function getClassSchedule() {
    try {
        const groups = await Group.find({})
            .populate('lessonSchedule.teacher')
            .populate('lessonSchedule.room')
            .populate('lessonSchedule.classType')

        const schedule = {};

        Object.values(availableWeekDays).map(v => schedule[v] = {});

        groups.forEach(group => {
            group.lessonSchedule.forEach(lesson => {
                const { dayOfWeek, timeSlot, teacher, room, classType, _id } = lesson;

                const obj = {
                    groupName: group.shortName,
                    room: room.name,
                    teacher: teacher.username,
                    classType: classType.name,
                    lessonScheduleId: _id,
                    groupId: group._id
                    // timeSlot,
                    // students: studentNames,
                };

                if (schedule?.[dayOfWeek]?.[timeSlot]) {
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

const getClassCreateParams = async() => {
    const room = await Room.find().populate();
    const classTypes = await ClassTypes.find().populate();
    const group = await Group.find().populate();

    const roles = await Role.find({});
    const rolesObj = {};
    roles.map(i => {rolesObj[i.name] = i.id})
    const teachers = await User.find({role: rolesObj[ROLES.ADMIN]}).populate();

    return {
        group: group.map(i => {
            return {value: i._id, label: i.name}
        }),
        teacher: teachers.map(i => {
            return {value: i._id, label: i.username}
        }),
        room: room.map(i => {
            return {value: i._id, label: i.name}
        }),
        classType: classTypes.map(i => {
            return {value: i._id, label: i.name}
        }),
        timeSlot: availableTimeslots.map(i => {
            return {value: i, label: i}
        }),
        dayOfWeek: Object.values(availableWeekDays).map(i => {
            return {value: i, label: i}
        })
    }
}

module.exports = { getClassSchedule, getClassCreateParams };
