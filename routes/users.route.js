const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const roomController = require("../controllers/roomController");
const tickets = require("../controllers/ticketController");

// api for singup
router.post("/signup", userControllers.signup);

// api for loggin
router.post("/login", userControllers.login);

// api to check page permission for diffrent roles
router.get(
    "/getAllUsers",
    userControllers.allowIfLoggedin,
    userControllers.grantAccess("readAny", "profile"),
    userControllers.getAllUsers
);

//api to create room id
router.get("/createRoom", roomController.createRoomId);

// api for tickets
router.post('/createTicket', tickets.createTicket);
router.put('/updateTicketById/:id', tickets.updateTicketById);
router.delete('/deleteTicketById/:id', tickets.deleteTicketById);
router.get('/getTicketsByStatus/:status', tickets.getTicketsByStatus);
module.exports = router;