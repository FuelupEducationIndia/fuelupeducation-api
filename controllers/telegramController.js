const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const checkSignature = ({ hash, ...userData }) => {
	// create a hash of a secret with the bot token
	const secretKey = createHash('sha256').update(process.env.BOT_TOKEN).digest()

	// data returned by telegram is user id, first_name, last_name,auth_date,hash etc.
	const dataCheckString = Object.keys(userData)
		.sort()
		.map((key) => `${key}=${userData[key]}`)
		.join('\n')

	// run a cryptographic hash function over the data to be authenticated and the secret
	const hmac = createHmac('sha256', secretKey)
		.update(dataCheckString)
		.digest('hex')

	// compare the hash that you calculate on your side (hmac) with what Telegram sends you (hash) and return the result
	return hmac === hash
}

const telegramAuth = async (req, res, next) => {
	if (checkSignature(req.query)) {
		//user data verified, send access token
		const { id, username, first_name, last_name } = req.query
		try {
			const accessToken = jwt.sign(
				{
					_id: id,
					username,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: '1d',
				}
			)
			const user = await User.create({
				telegramId: id,
				telegramUsername: username,
				accessToken: accessToken,
			})

			res.status(200).json({
				data: {
					firstName: first_name,
					lastName: last_name,
				},
				accessToken,
			})
		} catch (error) {}
	} else {
		// data is not authenticated
		res.status(400).json({
			data: null,
			error: 'user data corrupted',
		})
	}
}

module.exports = telegramAuth
