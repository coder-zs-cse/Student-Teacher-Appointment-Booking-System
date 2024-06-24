const Student = require("../models/studentModel.js");
const Teacher = require("../models/teacherModel.js");
const Session = require("../models/sessionModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    // // console.log(req.body);
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
    // // console.log("Working");
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(500).send({ message: "Server error", success: false });
  }
};

const loginController = async (req, res) => {
  try {
    // // console.log(req.body);
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
    // // console.log("Working");
    res
      .status(200)
      .send({ message: "Login Successfull", success: true, data: { token } });
  } catch (error) {
    res.status(500).send({ message: "Server error", success: false, error });
  }
};

const userInfoController = async (req, res) => {
  try {
    let Model = req.body.role === "teacher" ? Teacher : Student;
    const user = await Model.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      let output = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: req.body.role,
      };
      if (output.role === "teacher") {
        output["speciality"] = user.speciality;
      }
      return res.status(200).send({
        success: true,
        data: output,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Error getting user info",
      success: false,
    });
  }
};

const bookAppointmentController = async (req, res) => {
  try {
    const { studentID, teacherID, scheduleDateTime } = req.body;
    const existingAppointment = await Session.findOne({
      teacherID,
      scheduleDateTime,
    });

    if (existingAppointment) {
      return res
        .status(400)
        .json({ success: false, message: "This slot is already booked" });
    } else {
      const newAppointment = new Session({
        studentID,
        teacherID,
        scheduleDateTime,
        status: "pending", // This is the default, but we're setting it explicitly for clarity
      });

      // Save the new appointment
      await newAppointment.save();
      res
        .status(201)
        .json({
          success: true,
          message: "Appointment booking request sent successfully",
          appointment: newAppointment,
        });
    }
  } catch (error) {
    console.error("Error booking appointment:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error booking appointment",
        error: error.message,
      });
  }
};
const teacherDetailsController = async (req, res) => {
  try {
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
};

const teacherInfoController = async (req, res) => {
  try {
    const teacherid = req.body.teacherID;
    const teacher = await Teacher.findOne({ _id: teacherid });
    const appointments = await Session.find({
      teacherID: teacherid,
    }).sort({ scheduleDateTime: 1 });

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
};
const appointmentListController =  async (req, res) => {
    try {
      const idName = req.body.role==='student' ? "studentID" : "teacherID"
      const id = req.body.userId; // Assuming you have authentication middleware
      // // console.log(req.body);
      // const appointments = await Session.find({ teacherID });
      const appointments = await Session.find({ [idName]: id })
        .populate("teacherID", "name")// This populates the student's name
        .populate("studentID","name")
        .sort({ scheduleDateTime: 1 }); // Sort by date and time
      res.status(200).json(appointments);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

const updateAppointmentController = async (req, res) => {
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
};

const deleteAppointmentController = async(req,res)=>{
  try {
    // console.log("my body", req.body);
    const { _id} = req.body;
    const deletedAppointment = await Session.deleteOne({_id})
    if (deletedAppointment.deletedCount === 1) {
      res.status(200).json({ message: 'Appointment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = {
  registerController,
  loginController,
  userInfoController,
  bookAppointmentController,
  teacherDetailsController,
  teacherInfoController,
  appointmentListController,
  updateAppointmentController,
  deleteAppointmentController
};
