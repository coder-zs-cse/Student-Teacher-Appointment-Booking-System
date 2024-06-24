const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");
const Student = require("../models/studentModel.js");
const Teacher = require("../models/teacherModel.js");
const Session = require("../models/sessionModel.js");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware.js");
const teacherAuth = require("../middlewares/teacherauth.js")

router.use(express.json());


router.put("/appointments/:id", authMiddleware, teacherAuth,async (req, res) => {
  try {
    // console.log("my body", req.body);
    const { _id, status } = req.body;
    const appointments = await Session.findByIdAndUpdate(_id, {
      status
    });
    // console.log("thisiss", appointments);
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
    
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});



router.post("/get-teacher-by-id", authMiddleware,teacherAuth, async (req, res) => {
  try {
    const teacherid = req.body.teacherID;
    const teacher = await Teacher.findOne({ _id: teacherid });
    const appointments = await Session.find({
      teacherID: teacherid,
    }).sort({ "dateTime.date": 1, "dateTime.time": 1 });
    return res.status(200).send({
      success: true,
      data: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        speciality: teacher.speciality,
        appointmentsList: appointments,
      },
    });
    
  } catch (error) {
    return res.status(500).send({
      message: "Error getting teacher info",
      success: false,
    });
  }
});

module.exports = router;
