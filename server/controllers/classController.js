const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {getClassSchedule, getClassCreateParams} = require("../models/ClassSchedule");
const hasRole = require("../middleware/roleMiddleware");
const {ROLES} = require("../models/User");
const Course = require('../models/Course');
const Group = require('../models/Group');
const Room = require('../models/Room');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const ClassType = require('../models/ClassType');
const {availableTimeslots, availableWeekDays} = require("../constants");

// Create class
router.post('/class', async(req, res) => {
    const { group, teacher, room, classType, timeSlot, dayOfWeek } = req.body;
	const objToInsert = {dayOfWeek: dayOfWeek, room, classType, teacher, timeSlot};

	try {
		await Group.findByIdAndUpdate(group, {
			$push: {
				lessonSchedule: objToInsert
			}
		});

		res.json(objToInsert);
	} catch (err) {
		res.status(500).json(err)
	}
});

// Read all classes
router.get('/class',
    verifyToken,
    (req, res, next) => hasRole(req, res, next, [ROLES.ADMIN]),
    (req, res) => {
	getClassSchedule()
		.then((data) => res.json(data))
		.catch((err) => res.status(500).json(err));
});

router.get('/class/params', verifyToken, (req, res, next) => hasRole(req, res, next, [ROLES.ADMIN]), (req, res) => {
	getClassCreateParams().then(val => res.json(val)).catch(err => res.status(500).json(err))
})

// Update class
// router.put('/class/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, startDate, endDate, room, teacher, link } = req.body;
//     Class.findByIdAndUpdate(id, { name, startDate, endDate, room, teacher, link }, { new: true })
//         .then((data) => res.json(data))
//         .catch((err) => res.status(500).json(err));
// });
//
// // Delete class
// router.delete('/class/:id', (req, res) => {
//     const { id } = req.params;
//     Class.findByIdAndDelete(id)
//         .then(() => res.sendStatus(204))
//         .catch((err) => res.status(500).json(err));
// });

module.exports = router;