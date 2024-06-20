const mongoose = require("mongoose")

const studentSchema =  new mongoose.Schema({
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
    }
},{
    timestamps: true
})

const studentModel = mongoose.model('students',studentSchema)

module.exports = studentModel;