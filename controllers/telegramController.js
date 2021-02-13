const User = require('../models/user.model')

const telegramAuth = (req, res, next) => {
	console.log(req.query)
}

module.exports = telegramAuth
