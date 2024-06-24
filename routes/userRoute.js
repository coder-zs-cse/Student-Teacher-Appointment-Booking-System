const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");
const Student = require("../models/studentModel.js");
const Teacher = require("../models/teacherModel.js");
const Session = require("../models/sessionModel.js");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware.js");
const studentAuth = require("../middlewares/studentauth.js")

const {registerController, 
  loginController, 
  userInfoController,
  appointmentListController,
  teacherDetailsController,
  bookAppointmentController,
  teacherInfoController,
  updateAppointmentController,
  deleteAppointmentController
}  = require('../controllers/userCtrl.js')




router.use(express.json());

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/get-user-info-by-id", authMiddleware, userInfoController);

router.get("/book-appointment", authMiddleware, studentAuth, teacherDetailsController);

router.post("/teacher/book-appointment/", authMiddleware,studentAuth, bookAppointmentController);

router.post("/get-teacher-by-id", authMiddleware,studentAuth, teacherInfoController);

router.get("/appointments", authMiddleware, appointmentListController);

router.put("/update-appointment/:id", authMiddleware, updateAppointmentController)

router.delete('/delete-appointment/:id',authMiddleware, deleteAppointmentController)

module.exports = router;


