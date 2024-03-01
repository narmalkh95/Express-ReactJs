const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Users = require("../models/User");
const moment = require("moment");
const Group = require("../models/Group");
dotenv.config();



const HOST = process.env.HOST_IP || 'localhost';


router.get('/verify', async (req, res) => {
    const { token } = req.query;
    const decoded = jwt.verify(token, 'secret');
     const user = await Users.findById( decoded.userId);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username' });
    }
    const requestedTime = moment();
    const day = moment().day();
    const currentDate = requestedTime.format('DD-MM-YYYY');

    console.log(requestedTime,'requestedTime', moment().day())

    const dateOffNumbers = {
        1 : 'Երկուշաբթի',
        2 : 'Երեքշաբթի',
        3 : 'Չորեքշաբթի',
        4 : 'հինգշաբթի',
        5 : 'Ուրբաթ',
    }

    Users.findById(decoded.userId)
        .then(user => {
            Group.find({
                'lessonSchedule.dayOfWeek': dateOffNumbers[day], // Matches documents where any document in lessonSchedule has dayOfWeek 'Երկուշաբթի'
                students: decoded.userId
            })
                .populate('students')
                .populate({
                    path: 'lessonSchedule.teacher', // Assuming you want to populate details about the teacher
                    model: 'User' // or whatever your teacher model is named
                })
                .exec()
                .then(groups => {
                    // Iterate over each group if necessary
                    groups.forEach(group => {
                        console.log('Found group:', group);
                        // You can also iterate over lessonSchedule here if you need to process or log specific schedules
                        group.lessonSchedule.forEach(schedule => {
                            if (schedule.dayOfWeek === 'Երկուշաբթի') {
                                console.log('Lesson Schedule for Երկուշաբթի:', schedule);
                            }
                        });
                    });
                })
                .catch(err => console.error('Error finding groups:', err));
        })
        .catch(err => console.error('Error finding user:', err));

    // Initialize status as late
    // let attendanceEntry = user.attendanceList.find(entry => entry.date === '01-01-2024');
    //
    // const [start, end] = attendanceEntry.timeSlot.split(' - ');
    //
    // const startTime = moment(start, 'HH:mm');
    // const endTime = moment(end, 'HH:mm');
    //
    // // Determine the attendance status based on the current time
    // console.log(requestedTime.isBefore(endTime),'tiem')
    //
    // if (attendanceEntry) {
    //     // Update only the status of the existing entry
    //     attendanceEntry.status = true ? 'kkkk' : 'pppp';
    //     // Log the update for confirmation
    //     console.log(`Attendance status updated for ${currentDate}. Status: ${attendanceEntry.status}`);
    //
    //     try {
    //         await user.save();
    //         console.log('User attendance updated successfully.');
    //     } catch (e) {
    //         console.log(e, 'Error saving user attendance.');
    //     }
    // } else {
    //     // If no entry for today, log that no update was performed
    //     console.log(`No attendance entry exists for ${currentDate} to update.`);
    // }

    return 'koko';
    //@TODO check if the user late or in time to class and save in db

   // res.redirect(`http://${HOST}:3000/thank-you`);

});

module.exports = router;
