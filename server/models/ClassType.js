const mongoose = require('mongoose');

const classTypeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	students: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
});

const ClassType = mongoose.model('ClassType', classTypeSchema);

module.exports = ClassType;