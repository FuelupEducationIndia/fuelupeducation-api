const mongoose = require('mongoose');

let groupUserSchema = new mongoose.Schema({
    group_id: {
        required: true,
        type: String,
        minlength: 5,
        maxlength: 255
    },
    user_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [1, 0],
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now(),
    }

});

const GroupUser = mongoose.model('Group_User', groupUserSchema);
module.exports = GroupUser;