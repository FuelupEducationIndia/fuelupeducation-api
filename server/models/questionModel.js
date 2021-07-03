const mongoose = require('mongoose')
const { Schema } = mongoose
const questionSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    options: [
        {
            option: {
                type: String,
                required: true,
                trim: true,
            },
        }
    ],
    correctOption: {
        type: String,
        required: true,
        trim: true,
    },
    sectionId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });
module.exports = mongoose.model('Question', questionSchema)


