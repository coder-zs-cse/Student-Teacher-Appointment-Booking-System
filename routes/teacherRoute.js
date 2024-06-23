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

router.post("/register", async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password, role, name } = req.body;
    let Model = role === "teacher" ? Teacher : Student;

    const userExist = await Model.findOne({ email });
    if (userExist) {
      return res.status(200).send({
        message: "User with same email already exists",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Model({
      email,
      password: hashedPassword,
      name,
      role,
    });
    if (role === "teacher" && req.body.speciality) {
      newUser.speciality = req.body.speciality;
    }
    await newUser.save();
    // console.log("Working");
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(500).send({ message: "Server error", success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password, role } = req.body;
    let Model = role === "teacher" ? Teacher : Student;

    const user = await Model.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exists", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Incorrect password or email address",
        success: false,
      });
    }
    const token = await jwt.sign(
      { id: user._id, myRole: role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    // console.log("Working");
    res
      .status(200)
      .send({ message: "Login Successfull", success: true, data: { token } });
  } catch (error) {
    res.status(500).send({ message: "Server error", success: false, error });
  }
});




router.put("/appointments/:id", authMiddleware, teacherAuth,async (req, res) => {
  try {
    // In a real application, you'd get the doctorId from the authenticated user
    console.log("my body", req.body);
    const { _id, status } = req.body;
    const appointments = await Session.findByIdAndUpdate(_id, {
      status
    });
    console.log("thisiss", appointments);
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
    // const teacherID = req.body.userId  // Assuming you have authentication middleware
    // // const appointments = await Session.find({ teacherID });
    // const appointments = await Session.find({ teacherID })
    //   .populate('studentID', 'name')  // This populates the student's name
    //   .sort({ 'dateTime.date': 1, 'dateTime.time': 1 });  // Sort by date and time
    // console.log(appointments);
    // res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/teacher/book-appointment/", authMiddleware, teacherAuth,async (req, res) => {
  try {
    const { studentID, teacherID, date, time } = req.body;
    const existingAppointment = await Session.findOne({
      teacherID,
      "dateTime.date": date,
      "dateTime.time": time,
    });

    if (existingAppointment) {
      return res
        .status(400)
        .json({ success: false, message: "This slot is already booked" });
    } else {
      const newAppointment = new Session({
        studentID,
        teacherID,
        dateTime: { date, time },
        status: "pending", // This is the default, but we're setting it explicitly for clarity
      });

      // Save the new appointment
      await newAppointment.save();
      res.status(201).json({
        success: true,
        message: "Appointment booked successfully",
        appointment: newAppointment,
      });
    }
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({
      success: false,
      message: "Error booking appointment",
      error: error.message,
    });
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
    const teacherData = await Teacher.find();
    const finalData = teacherData.map((teacher) => {
      return {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        speciality: teacher.speciality,
      };
    });
    res.status(200).send({ success: true, data: finalData });
  } catch (error) {
    return res.status(500).send({
      message: "Error getting teacher info",
      success: false,
    });
  }
});

module.exports = router;
