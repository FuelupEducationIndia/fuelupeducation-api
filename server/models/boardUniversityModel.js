const mongoose = require('mongoose')
const { Schema } = mongoose;

const boardUniversitySchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
}, {timestamps:true});


module.exports = mongoose.model('Board_University', boardUniversitySchema)




