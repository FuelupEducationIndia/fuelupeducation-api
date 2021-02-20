const express = require('express');
const userRouter = require('../routes/users');
const groupRouter = require('../routes/groups');
const router = express.Router();

router.use('user', userRouter);
router.use('group', groupRouter);


module.exports = router;