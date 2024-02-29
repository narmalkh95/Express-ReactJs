const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const hasRole = require("../middleware/roleMiddleware");
const {ROLES} = require("../models/User");
const User = require("../models/User");
const Group = require("../models/Group");

router.get('/',
	verifyToken,
	(req, res, next) => hasRole(req, res, next, [ROLES.STUDENT]),
	(req, res) => {
		const userId = req.userId;
		const studentId = req.query.studentId;

		//If the logged user is student get the student Id as userId.
		//If the logged user is teacher get the student id from params.
		User.findById(studentId || userId).then(user => {
			Group.find({}).populate('lessonSchedule.classType').populate('lessonSchedule.room').populate('lessonSchedule.teacher')
				.then(groups => {
					const currentGroup = groups.filter(group => group.students.includes(studentId || userId))[0];
					res.json({
						attendanceList: user.attendanceList,
						lessonSchedule: currentGroup['lessonSchedule'],
						group: {name: currentGroup.shortName, id: currentGroup._id}
					})
				})
		})

	});

module.exports = router;