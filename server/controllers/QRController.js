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

	const currentWeekdayName = moment().format('dddd').toLowerCase();

	Group.find({}).populate('lessonSchedule.classType').populate('lessonSchedule.room').populate('lessonSchedule.teacher')
		.then(groups => {
			const currentGroupLessonSchedules = groups.filter(group => group.students.includes(decoded.userId))[0].lessonSchedule;
			const todaysLessonSchedules = currentGroupLessonSchedules.filter(lesson => lesson.dayOfWeek === availableWeekDays[currentWeekdayName]);
			const format = 'hh:mm';
			const time = moment(moment().format(format), format);

			const exactLesson = todaysLessonSchedules.filter(lesson => {
				const [startH, endH] = lesson.timeSlot.split(' - ');
				const beforeTime = moment(startH, format);
				const afterTime = moment(endH, format);

				return time.isBetween(beforeTime, afterTime)
			});

			if (!exactLesson.length) {
				return res.json('You do not have any lesson for now')
			}

			const [startH, endH] = exactLesson[0].timeSlot.split(' - ');
			const startTime = moment(startH, format);
			const duration = moment.duration(startTime.diff(time));
			const minutesDifference = duration.asMinutes();
			const durationOfTheLessonInMinutes = 80; //1:20 hour

			const status = durationOfTheLessonInMinutes - minutesDifference < 10 ? attendanceStatus.inTime : attendanceStatus.late

			user.attendanceList.push({
				date: moment().format('DD-MM-YYYY'),
				timeSlot: exactLesson[0].timeSlot,
				status: status,
				classType: exactLesson[0]?.classType.name
			});

			user.save()

			res.json('You have successfully registered your time');
			res.redirect(`http://${HOST}:3000/thank-you`);
		})
});

module.exports = router;
