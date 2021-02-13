const bcrypt = require('bcrypt')
const { User, validate } = require('../models/user.model')

const roles = require('../middleware/roles')

// function to hash password
async function hashPassword(password) {
	return await bcrypt.hash(password, 10)
}

// function to validate password
async function validatePassword(plainPassword, hashPassword) {
	return await bcrypt.compare(plainPassword, hashPassword)
}

// function to refister user
exports.signup = async (req, res, next) => {
	try {
		// first validate request body
		const { error } = validate(req.body)

		if (error) return res.status(400).send(error.details[0].message)

		// find email already exist or not
		let user = await User.findOne({
			email: req.body.email,
		})

		if (user)
			return res.status(400).json({
				status: false,
				error: 'User already registered.',
			})
		const hashedPassword = await hashPassword(req.body.password)
		user = new User({
			email: req.body.email,
			password: hashedPassword,
			role: req.body.role || 'admin',
		})
		await user.save()
		const token = user.generateAuthToken()
		res.header('x-auth-token', token).json({
			status: true,
			_id: user._id,
			email: user.email,
			token: token,
			message: 'User registered successfully!',
		})
	} catch (error) {
		next(error)
	}
}
// function to user logged in
exports.login = async (req, res, next) => {
	try {
		// first validate request body
		const { error } = validate(req.body)

		if (error) return res.status(400).send(error.details[0].message)
		const { email, password, role } = req.body

		const user = await User.findOne({
			email,
		})
		if (!user)
			return res.status(400).json({
				status: false,
				message: 'Email doest not exist!',
			})

		const validPassword = await validatePassword(password, user.password)
		if (!validPassword)
			return res.status(400).json({
				status: false,
				message: 'Password is not correct!',
			})
		const accessToken = user.generateAuthToken()
		User.findByIdAndUpdate(user._id, {
			accessToken,
		})

		res.status(200).json({
			data: {
				email: user.email,
				role: user.role,
			},
			accessToken,
		})
	} catch (error) {
		next(error)
	}
}

exports.getAllUsers = async (req, res, next) => {
	const users = await User.find({})
	res.status(200).json({
		data: users,
	})
}

// function to get user by ID
exports.getUser = async (req, res, next) => {
	try {
		const userId = req.params.userId
		const user = await User.findById(userId)
		if (!user) return next(new Error('User does not exist'))
		res.status(200).json({
			data: user,
		})
	} catch (error) {
		next(error)
	}
}

// function to check user request for action have permission or not
exports.grantAccess = function (action, resource) {
	return async (req, res, next) => {
		try {
			const permission = roles.role.can(req.user.role)[action](resource)
			if (!permission.granted) {
				return res.status(401).json({
					error: "You don't have enough permission to perform this action",
				})
			}
			next()
		} catch (error) {
			next(error)
		}
	}
}

// function to check whether user is logged in or not
exports.allowIfLoggedin = async (req, res, next) => {
	try {
		const user = res.locals.loggedInUser
		if (!user) {
			res.status(401).json({
				error: 'You need to be logged in to access this route',
			})
		}
		req.user = user
		next()
	} catch (error) {
		next(error)
	}
}
