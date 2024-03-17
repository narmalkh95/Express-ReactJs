const mongoose = require('mongoose');
const Group = require('./models/Group');
const Room = require('./models/Room');
const ClassType = require('./models/ClassType');
const Role = require('./models/Role');
const User = require('./models/User');
const {ROLES, attendanceStatus} = require("./models/User");
const {availableWeekDays, availableTimeslots} = require('./constants/index')
const moment = require('moment');
const {toMomentWeekDays} = require("./constants");

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
            { username: 'Մկրտչյան Գ.', email: 'test@polytechnic.am1', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ամիրբեկյան Ն.', email: 'test@polytechnic.am2', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ուսեպյան Մ.', email: 'test@polytechnic.am3', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Հովհաննիսյան Է.', email: 'test@polytechnic.am4', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Համբարձումյան Ք.', email: 'test@polytechnic.am5', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Հարությունյան Լ.', email: 'test@polytechnic.am6', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Գանովիչ Տ.', email: 'test@polytechnic.am7', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Տոմեյան Գ.', email: 'test@polytechnic.am8', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Խեմչյան Ա.', email: 'test@polytechnic.am9', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Օբոյանցև Վ.', email: 'test@polytechnic.am10', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Մանուկյան Ա.', email: 'test@polytechnic.am11', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Մարկոսյան Մ.', email: 'test@polytechnic.am12', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Սարգսյան Ս.', email: 'test@polytechnic.am13', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ղազարյան Մ.', email: 'test@polytechnic.am14', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Մանուկյան Մ.', email: 'animanukyan_prof@polytechnic.am', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Հարությունյան Լ.', email: 'harutyunyanlevon_prof@polytechnic.am', role: rolesObj[ROLES.ADMIN], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        ];

        const teachers = await User.insertMany(teachersArr);

        // Create students
        const studentsArr = [
            { username: 'Կիրակոսյան Հայկ Սամվելի', email: 'kirakosyan_hayk019@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Պետրոսյան Նարեկ Խաչատուրի', email: 'petrosyan_narek019@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Մանուկյան Անի Վահանի', email: 'manukyan_ani019@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Գրիգորյան Ստեփան Մարտինի', email: 'girgoryan_stepan019@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Մուրադյան Միասնիկ Մուրադի', email: 'muradyan_misnik019@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Հարությունյան Աննա Վահագնի', email: 'harutyunyan_anna019@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Բարսեղյան Սյունե Ժիրայրի', email: 'barsexyan_suren019@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Խեչոյան Ադրինե Մհերի', email: 'xechoyan_adrine019@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ավետիսյան Մհեր Ենոքի', email: 'avetisyan_mher019@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Գաբրիելյան Հմայակ Անդրանիկի', email: 'gabrielyan_hmayak055@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Հայրապետյան Մնացական Համբարձումի', email: 'hayrapetyan_mnacakan055@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Առաքելյան Վիլյամ Սուրենի', email: 'araqelyan_vilyam055@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Խաչատրյան Աննա Գևորգի', email: 'xachatryan_anna055@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Մարգարյան Գևորգ Հայկի', email: 'margaryan_gevorg055@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Մուրադյան Արշակ Հովհաննեսի', email: 'muradyan_arshak055@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Մարգարյան Դավիթ Պարույրի', email: 'margaryan_davit055@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Պողոսյան Գոհար Համլետի', email: 'poxosyan_gohar055@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Սաֆարյան Արտակ Սուրենի', email: 'safaryan_artak055@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Ալեքսանյան Նարեկ Արթուրի',  email: 'aleqsanyan_narek055@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Առաքելյան Անի Վահրամի', email: 'araqelyan_ani055@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Բաղդասարյան Մարիա Արտյոﬕ', email: 'barsexyan_mariam018@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Գրիգորյան Աննա Արտաշեսի', email: 'grigoryan_annd018@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Լևոնյան Թերեզա Արծրունի', email: 'levonyan_tereza018@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Խանգելդյան Ստեֆանիա Գուրգենի', email: 'xangeldyan_stefania018@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Կիրակոսյան Մերի Ահարոնի', email: 'kisakosyan_mery018@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Կոստանյան Անահիտ Արսենի', email: 'kostanyan_anahit018@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Հակոբյան Լիանա Հենզելի', email: 'hakobyan_liana018@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Հովակիմյան Լուսինե Կարենի', email: 'hovakimyan_lusine018@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Մելիքյան Յուրի Արտավազդի', email: 'meliqyan_yuri018@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Նազարեթյան Սաթենիկ Վահանի', email: 'nazaretyan_satenik018@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Սահակյան Լուսինե Գնելի', email: 'sahakyan_lusine018@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Վարդանյան Տաթև Գեղամի', email: 'vardanyan_tatev018@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
            { username: 'Վարդանյան Նարեկ Հրանտի', email: 'vardanyan_narek018@polytechnic.am', role: rolesObj[ROLES.STUDENT], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        ];

        const students = await User.insertMany(studentsArr);

        const studentsGroupIds = {
            1: students.slice(0, 9).map(s => s._id),
            2: students.slice(9, 17).map(s => s._id),
            3: students.slice(17, 25).map(s => s._id),
            4: students.slice(25).map(s => s._id),
        }

        const classTypes = await ClassType.create([
            { name: 'Լաբ. 1', students: studentsGroupIds[1]},
            { name: 'Լաբ. 2', students: studentsGroupIds[2]},
            { name: 'Լաբ. 3', students: studentsGroupIds[3]},
            { name: 'Լաբ. 4', students: studentsGroupIds[4]},
            { name: 'Դաս.', students: [...studentsGroupIds[1], ...studentsGroupIds[2], ...studentsGroupIds[3], ...studentsGroupIds[4]]},
            { name: 'Գործ. 1', students: studentsGroupIds[1]},
            { name: 'Գործ. 2', students: studentsGroupIds[2]},
            { name: 'ԿԱ 1', students: studentsGroupIds[1]},
            { name: 'ԿԱ 2', students: studentsGroupIds[2]},
        ])

        // Create groups
        const groups = await Group.create([
            {
                name: 'օպերացիոն համակարգեր',
                shortName: 'ՕՀ',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[0], teacher: [teachers[0]._id], room: rooms[0]._id, classType: classTypes[2]._id, students: classTypes[2].students, onOddWeek: true, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[1], teacher: [teachers[0]._id], room: rooms[1]._id, classType: classTypes[0]._id, students: classTypes[0].students, onOddWeek: true, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[1], teacher: [teachers[1]._id], room: rooms[4]._id, classType: classTypes[1]._id, students: classTypes[1].students, onOddWeek: true, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[3], teacher: [teachers[1]._id], room: rooms[5]._id, classType: classTypes[3]._id, students: classTypes[3].students, onOddWeek: true, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.wednesday, timeSlot: availableTimeslots[0], teacher: [teachers[0]._id], room: rooms[3]._id, classType: classTypes[4]._id, students: classTypes[4].students, onOddWeek: true, onEvenWeek: true },
                ],
            },
            {
                name: 'քոմփյութերային ցանցերի ծրագրավորում',
                shortName: 'ՔՑԾ',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[0], teacher: [teachers[9]._id], room: rooms[4]._id, classType: classTypes[1]._id, students: classTypes[1].students, onOddWeek: true, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[1], teacher: [teachers[9]._id], room: rooms[4]._id, classType: classTypes[3]._id, students: classTypes[3].students, onOddWeek: true, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[3], teacher: [teachers[9]._id], room: rooms[4]._id, classType: classTypes[0]._id, students: classTypes[0].students, onOddWeek: true, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.wednesday, timeSlot: availableTimeslots[1], teacher: [teachers[11]._id], room: rooms[3]._id, classType: classTypes[4]._id, students: classTypes[4].students, onOddWeek: true, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.wednesday, timeSlot: availableTimeslots[3], teacher: [teachers[9]._id], room: rooms[4]._id, classType: classTypes[2]._id, students: classTypes[2].students, onOddWeek: true, onEvenWeek: true },
                ],
            },
            {
                name: 'օբյեկտ կողմնորոշված ծրագրավորում',
                shortName: 'ՕԿԾ',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.thursday, timeSlot: availableTimeslots[0], teacher: [teachers[4]._id], room: rooms[8]._id, classType: classTypes[2]._id, students: classTypes[2].students, onOddWeek: true, onEvenWeek: false },
                    { dayOfWeek: availableWeekDays.thursday, timeSlot: availableTimeslots[0], teacher: [teachers[4]._id], room: rooms[8]._id, classType: classTypes[0]._id, students: classTypes[0].students, onOddWeek: false, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[0], teacher: [teachers[4]._id], room: rooms[8]._id, classType: classTypes[3]._id, students: classTypes[3].students, onOddWeek: true, onEvenWeek: false },
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[0], teacher: [teachers[4]._id], room: rooms[8]._id, classType: classTypes[1]._id, students: classTypes[1].students, onOddWeek: false, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[1], teacher: [teachers[4]._id], room: rooms[9]._id, classType: classTypes[4]._id, students: classTypes[4].students, onOddWeek: true, onEvenWeek: true },
                ],
            },
            {
                name: 'ծրագրերի թեստավորում',
                shortName: 'ԾԹ',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[0], teacher: [teachers[2]._id], room: rooms[2]._id, classType: classTypes[0]._id, students: classTypes[0].students, onOddWeek: true, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[1], teacher: [teachers[2]._id], room: rooms[2]._id, classType: classTypes[2]._id, students: classTypes[2].students, onOddWeek: true, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[2], teacher: [teachers[2]._id], room: rooms[3]._id, classType: classTypes[4]._id, students: classTypes[4].students, onOddWeek: true, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[3], teacher: [teachers[2]._id], room: rooms[2]._id, classType: classTypes[1]._id, students: classTypes[1].students, onOddWeek: true, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.wednesday, timeSlot: availableTimeslots[2], teacher: [teachers[2]._id], room: rooms[2]._id, classType: classTypes[2]._id, students: classTypes[2].students, onOddWeek: true, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.thursday, timeSlot: availableTimeslots[0], teacher: [teachers[2]._id], room: rooms[2]._id, classType: classTypes[3]._id, students: classTypes[3].students, onOddWeek: true, onEvenWeek: true },
                ],
            },
            {
                name: 'ՔՊ և ԱԻՀ',
                shortName: 'ՔՊ և ԱԻՀ',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.tuesday, timeSlot: availableTimeslots[0], teacher: [teachers[12]._id], room: rooms[7]._id, classType: classTypes[4]._id, students: classTypes[4].students, onOddWeek: true, onEvenWeek: false },
                    { dayOfWeek: availableWeekDays.tuesday, timeSlot: availableTimeslots[0], teacher: [teachers[12]._id], room: rooms[7]._id, classType: classTypes[6]._id, students: classTypes[6].students, onOddWeek: false, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[3], teacher: [teachers[12]._id], room: rooms[11]._id, classType: classTypes[5]._id, students: classTypes[5].students, onOddWeek: false, onEvenWeek: true },
                ],
            },
            {
                name: 'ԾՏ',
                shortName: 'ԾՏ',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.tuesday, timeSlot: availableTimeslots[1], teacher: [teachers[6]._id], room: rooms[6]._id, classType: classTypes[8]._id, students: classTypes[8].students, onOddWeek: true, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.thursday, timeSlot: availableTimeslots[1], teacher: [teachers[6]._id], room: rooms[6]._id, classType: classTypes[7]._id, students: classTypes[7].students, onOddWeek: true, onEvenWeek: true },
                ],
            },
            {
                name: 'ճյուղի տնտես',
                shortName: 'ճյուղի տնտես',
                lessonSchedule: [
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[2], teacher: [teachers[13]._id], room: rooms[10]._id, classType: classTypes[4]._id, students: classTypes[4].students, onOddWeek: true, onEvenWeek: true },
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[3], teacher: [teachers[13]._id], room: rooms[10]._id, classType: classTypes[5]._id, students: classTypes[5].students, onOddWeek: true, onEvenWeek: false },
                    { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[3], teacher: [teachers[13]._id], room: rooms[10]._id, classType: classTypes[6]._id, students: classTypes[6].students, onOddWeek: false, onEvenWeek: true },
                ],
            },
        ]);

        for (const group of groups) {
            for (const lesson of group.lessonSchedule) {
                const exactClassType = classTypes.find(classType => {
                    const cond = lesson.classType === classType._id
                    if (cond) {
                        // console.log(cond)
                    }
                    return cond
                });

                for(const student of exactClassType.students) {
                    const user = await User.findById(student._id);

                    if (user?.lessons?.length) {
                        user.lessons.push(lesson._id);
                    } else {
                        user.lessons = [lesson._id]
                    }

                    await user.save()
                }
            }
        }

        await createFakeAttendanceListData(groups, students, classTypes);
    } catch (error) {
        console.error('Error generating mock data:', error);
    } finally {
        mongoose.disconnect();
    }
}

const createFakeAttendanceListData = async(groups, students, classTypes) => {
    try {
        const startDate = moment('2024-01-01', 'YYYY-MM-DD').format('YYYY-MM-DD');
        const endDate = moment();
        const attendanceValues = Object.values(attendanceStatus);

        for (let m = moment(startDate); m.isBefore(endDate); m.add(1, 'week')) {
            console.log(m.format('DD-MM-YYYY'))
            console.log(m.week())
            for (let group of groups) {
                for (let lesson of group.lessonSchedule) {
                    const isOddWeek = m.week() % 2 === 1;
                    const isEvenWeek = m.week() % 2 === 0;

                    if (isOddWeek && !lesson.onOddWeek) {
                        continue;
                    }

                    if (isEvenWeek && !lesson.onEvenWeek) {
                        continue;
                    }

                    for (let studentId of lesson.students) {
                        const user = await User.findById(studentId);
                        //For every week we create fake attendance list data with selected current lesson id and week.
                        const fakeAttendanceObj = {
                            week: m.week(),
                            status: attendanceValues[Math.floor(Math.random() * 2)],
                            lessonId: lesson._id,
                            date: moment().day(toMomentWeekDays[lesson.dayOfWeek]).week(m.week()).format('DD-MM-YYYY'),
                            timeSlot: lesson.timeSlot,
                            groupName: group.shortName
                        };

                        user.attendanceList.push(fakeAttendanceObj);
                        await user.save();
                    }
                }
            }
        }

        console.log('Mock data generated successfully');
    } catch (err) {
        console.error('Error generating mock data in createFakeAttendanceListData:', err);
    }
}

module.exports = generateMockData;