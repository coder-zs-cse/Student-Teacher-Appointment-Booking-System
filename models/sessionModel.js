const mongoose = require("mongoose")

const dateTimeSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})
const sessionSchema =  new mongoose.Schema({
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true
    },
    teacherID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teachers',
        required: true
    },
    dateTime:{
        type: dateTimeSchema,
        default: {}
    },
    status:{
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    }
},{
    timestamps: true
})

const sessionModel = mongoose.model('sessions',sessionSchema)

module.exports = sessionModel;