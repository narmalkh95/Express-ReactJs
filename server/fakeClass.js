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
        ];

        const teachers = await User.insertMany(teachersArr);


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

        await createFakeAttendanceListData(groups, students, classTypes);

    } catch (error) {
        console.error('Error generating mock data:', error);
    } finally {
        mongoose.disconnect();
    }
}

const createFakeAttendanceListData = async(groups, students, classTypes) => {
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
        students.map(async (student) => {
            try {
                const group = groups.find((group) => group.students.includes(student._id));
                if (!group) {
                    console.log(`No group found for student ${student._id}`);
                    return;
                }

                const studentLessonSchedule = group.lessonSchedule;
                if (!studentLessonSchedule || studentLessonSchedule.length === 0) {
                    console.log(`No lesson schedule found for student ${student._id}`);
                    return;
                }

                studentsData[student._id] = studentLessonSchedule.map((i) => {
                    const classType = classTypes.find((c) => c._id === i.classType);
                    return {
                        dayOfWeek: toMomentWeekDays[i.dayOfWeek],
                        timeSlot: i.timeSlot,
                        classType: classType?.name,
                    };
                });
            } catch (error) {
                console.error(`Error processing student ${student._id}:`, error);
            }
        });

        for (let m = moment(startDate); m.isBefore(endDate); m.add(1, 'days')) {
            const weekDay = m.day();
            if (weekDay === 0 || weekDay === 6) continue;

            for (const id of Object.keys(studentsData)) {
                try {
                    const user = await User.findById(id);
                    if (!user) {
                        console.log(`User ${id} not found`);
                        continue;
                    }

                    const studentLessons = studentsData[id];
                    const lessonsForDay = studentLessons.filter((lesson) => lesson.dayOfWeek === weekDay);

                    for (const lesson of lessonsForDay) {
                        const attendanceObj = {
                            date: m.format('DD-MM-YYYY'),
                            timeSlot: lesson.timeSlot,
                            status: attendanceValues[Math.floor(Math.random() * 2)],
                            classType: lesson?.classType,
                        };

                        user.attendanceList.push(attendanceObj);
                    }

                    await user.save();
                } catch (error) {
                    console.error(`Error processing attendance for student ${id}:`, error);
                }
            }
        }


        // for (let m = moment(startDate); m.isBefore(endDate); m.add(1, 'days')) {
        //     const weekDay = m.day();
        //     if (weekDay === 0 || weekDay === 6 ) continue;
        //
        //     for (const id of Object.keys(studentsData)) {
        //         const user = await User.findById(id);
        //         const studentLessons = studentsData[id];
        //
        //         const lessonsForDay = studentLessons.filter(lesson => lesson.dayOfWeek === weekDay);
        //
        //         for (const lesson of lessonsForDay) {
        //             const attendanceObj = {
        //                 date: m.format('DD-MM-YYYY'),
        //                 timeSlot: lesson.timeSlot,
        //                 status: attendanceValues[Math.floor(Math.random() * 2)],
        //                 classType: lesson?.classType
        //             };
        //
        //             user.attendanceList.push(attendanceObj);
        //         }
        //
        //         await user.save();
        //     }
        // }

        console.log('Mock data generated successfully');
    } catch (err) {
        console.error('Error generating mock data in createFakeAttendanceListData:', err);
    }
}

generateMockData();