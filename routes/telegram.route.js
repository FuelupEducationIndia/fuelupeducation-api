const router = require('express').Router()
const telegramAuth = require('../controllers/telegramController')

router.route('/').get(telegramAuth)

module.exports = router
