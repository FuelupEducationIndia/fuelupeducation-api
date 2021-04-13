const express = require("express");
const userRouter = require("../routes/users");
const groupRouter = require("../routes/groups");
const lectureRouter = require("../routes/lecture");
const ticketRouter = require("../routes/ticket");
const roomRouter = require("../routes/room");
const certificateRoute = require("../routes/certificate");
const examRouter = require("../routes/exam");
const router = express.Router();

router.use("/user", userRouter);
router.use("/group", groupRouter);
router.use("/lecture", lectureRouter);
router.use("/ticket", ticketRouter);
router.use("/", roomRouter);
router.use("/certificate", certificateRoute);
router.use("/exam", examRouter);

module.exports = router;
