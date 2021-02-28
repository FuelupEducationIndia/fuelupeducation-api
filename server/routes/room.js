const express = require('express');
const roomController = require("../controllers/roomController");
const {
    v4: uuidV4
} = require("uuid");
const router = express.Router();


router.get("/", (req, res) => {
    res.redirect(`/api/${uuidV4()}`);
});

router.get("/leave", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

router.get("/:room", (req, res) => {
    res.render("room", {
        roomId: req.params.room,
    });
});
//api to create room id
router.get("/createRoom", roomController.createRoomId);
//api to upload call recording
router.post('/uploadRecording', roomController.uploadCallRecording);

module.exports = router