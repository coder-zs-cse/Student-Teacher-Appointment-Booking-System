const mongoose = require("mongoose")

const teacherSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    speciality:{
        type: String,
        default: ''
    }
},{
    timestamps: true
})

const teacherModel = mongoose.model('teachers',teacherSchema)

module.exports = teacherModel;