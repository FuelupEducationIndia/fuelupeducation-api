const express = require("express");
const router = express.Router();
const controller = require("../controllers/userControllers");

// api for singup
router.post("/signup", controller.signup);

// api for loggin 
router.post("/login", controller.login);

router.get('/getUser/:userId', controller.allowIfLoggedin, controller.getUser);

module.exports = router;