const {
    v4: uuidv4
} = require("uuid");

exports.createRoomId = function(req, res) {
    res.redirect(`/users/room/${uuidv4()}`);
};