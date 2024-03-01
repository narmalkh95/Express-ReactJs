const availableTimeslots = ['9:30 - 10:50', '11:00 - 12:20', '12:50 - 14:10', '14:20 - 15:40'];

const availableWeekDays = {
	monday: 'Երկուշաբթի',
	tuesday: 'Երեքշաբթի',
	wednesday: 'Չորեքշաբթի',
	thursday: 'հինգշաբթի',
	friday: 'Ուրբաթ',
};

const toMomentWeekDays = {
	[availableWeekDays.monday]: 1,
	[availableWeekDays.tuesday]: 2,
	[availableWeekDays.wednesday]: 3,
	[availableWeekDays.thursday]: 4,
	[availableWeekDays.friday]: 5,
}

const dateOffNumbers = {
	1 : 'Երկուշաբթի',
	2 : 'Երեքշաբթի',
	3 : 'Չորեքշաբթի',
	4 : 'հինգշաբթի',
	5 : 'Ուրբաթ',
}

module.exports = {availableTimeslots, availableWeekDays, toMomentWeekDays, dateOffNumbers};