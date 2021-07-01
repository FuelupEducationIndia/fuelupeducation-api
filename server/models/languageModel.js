const mongoose = require('mongoose')
const { Schema } = mongoose;


const languageSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
}, {timestamps:true});


module.exports =  mongoose.model('Language', languageSchema)


