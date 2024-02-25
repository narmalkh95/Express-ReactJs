const mongoose = require('mongoose');

const classTypeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}
});

const ClassType = mongoose.model('ClassType', classTypeSchema);

module.exports = ClassType;