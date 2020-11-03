const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

// api for singup
router.post("/signup", userControllers.signup);

// api for loggin 
router.post("/login", userControllers.login);

// api to check page permission for diffrent roles
router.get('/getAllUsers',
    userControllers.allowIfLoggedin,
    userControllers.grantAccess('readAny', 'profile'),
    userControllers.getAllUsers
);

module.exports = router;