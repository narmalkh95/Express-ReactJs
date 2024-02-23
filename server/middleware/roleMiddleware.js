const Users = require("../models/User");
async function hasRole(req, res, next, roles) {
	const user = await Users.findById(req.userId);

	if (!user || !roles.includes(user.role)) {
		// user's role is not authorized
		return res.status(403).json({ message: "Not allowed by this user role" });
	}

	next();
};

module.exports = hasRole;