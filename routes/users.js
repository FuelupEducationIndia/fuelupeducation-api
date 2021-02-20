const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const roomController = require("../controllers/roomController");
const lectureController = require('../controllers/lectureController');
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

//api to upload call recording
router.post('/uploadRecording', roomController.uploadCallRecording);


// api for create lecture 
router.post('/createLecture', lectureController.createLecture);
router.get('/getAllLectures', lectureController.getAllLectures);
router.get('/getLecturesById', lectureController.getLecturesById);
router.delete('/deleteLectureById', lectureController.deleteLectureById);



// api for tickets
router.post('/createTicket', tickets.createTicket);
router.put('/updateTicketById/:id', tickets.updateTicketById);
router.delete('/deleteTicketById/:id', tickets.deleteTicketById);
router.get('/getTicketsByStatus/:status', tickets.getTicketsByStatus);
module.exports = router;