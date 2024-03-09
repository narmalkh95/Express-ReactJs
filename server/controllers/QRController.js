const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Users = require("../models/User");
const moment = require("moment");
const Group = require("../models/Group");
const {availableWeekDays} = require("../constants");
const {attendanceStatus} = require("../models/User");
dotenv.config();

const HOST = process.env.HOST_IP || 'localhost';

router.get('/verify', async (req, res) => {
	const {token} = req.query;
	const decoded = jwt.verify(token, 'secret');
	const user = await Users.findById(decoded.userId);

	if (!user) {
		return res.status(401).json({message: 'Invalid username'});
	}

	const currentWeekdayName = 'monday';// moment().format('dddd').toLowerCase();

	Group.find({})
		.populate('lessonSchedule.classType')
		.populate('lessonSchedule.room')
		.populate('lessonSchedule.teacher')
		.then(groups => {
			// Filter groups where the user is a student
			const currentGroup = groups.find(group => group.students.includes(decoded.userId));

			if (!currentGroup) {
				return res.json('You are not enrolled in any groups');
			}

			const currentGroupLessonSchedules = currentGroup.lessonSchedule;

			if (!currentGroupLessonSchedules || !Array.isArray(currentGroupLessonSchedules) || currentGroupLessonSchedules.length === 0) {
				return res.json('There are no lesson schedules available');
			}

			const todaysLessonSchedules = currentGroupLessonSchedules.filter(lesson => lesson.dayOfWeek === availableWeekDays[currentWeekdayName]);
			const format = 'hh:mm';
			const time = moment(moment().format(format), format);


			const exactLesson = todaysLessonSchedules.find(lesson => {
				const [startH, endH] = lesson.timeSlot.split(' - ');
				const beforeTime = moment(startH, format);
				const afterTime = moment(endH, format);

				return time.isBetween(beforeTime, afterTime);
			});

			if (!exactLesson) {
				res.redirect(`https://6b87-217-113-22-35.ngrok-free.app/error`);
			}

			const [startH, endH] = exactLesson.timeSlot.split(' - ');
			const startTime = moment(startH, format);
			const duration = moment.duration(startTime.diff(time));
			const minutesDifference = duration.asMinutes();
			const durationOfTheLessonInMinutes = 80; // 1:20 hour

			const status = minutesDifference < 10 ? attendanceStatus.inTime : attendanceStatus.late;

			user.attendanceList.push({
				date: moment().format('DD-MM-YYYY'),
				timeSlot: exactLesson.timeSlot,
				status: status,
				classType: exactLesson.classType?.name // Ensure classType exists before accessing its name
			});

			user.save();


			res.redirect(`https://6b87-217-113-22-35.ngrok-free.app/thank-you`);
		})
		.catch(error => {
			console.error('Error:', error);
			res.status(500).json('Internal Server Error');
		});


	///res.redirect(`http://${HOST}:3000/thank-you`);
});

module.exports = router;
