const mongoose = require("mongoose");
const GroupSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 5,
        maxlength: 255,
    },
    created_by: {
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

const Group = mongoose.model("Group", GroupSchema);

module.exports.Group = Group;