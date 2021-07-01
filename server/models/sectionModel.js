const mongoose = require('mongoose')
const { Schema } = mongoose;


const sectionSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    languageId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    examTime: {
        type: Number,
        required: true
    }

}, {timestamps:true});


module.exports = mongoose.model('Section', sectionSchema)


