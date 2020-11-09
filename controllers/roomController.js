const {
    v4: uuidV4
} = require("uuid");

exports.createRoomId = function(req, res) {
    res.redirect(`/users/room/${uuidV4()}`);
};