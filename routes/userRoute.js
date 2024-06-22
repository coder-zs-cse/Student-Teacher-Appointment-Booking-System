const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require('../models/userModel.js')
const Student = require('../models/studentModel.js');
const Teacher = require('../models/teacherModel.js');
const jwt = require('jsonwebtoken')
const authMiddleware = require("../middlewares/authMiddleware.js")

router.use(express.json()) 

router.post('/register',async (req,res)=>{
    try{
        // console.log(req.body);
        const { email, password, role, name } = req.body;
        let Model = role === 'teacher' ? Teacher : Student;

        const userExist = await Model.findOne({ email });
        if (userExist) {
            return res.status(200).send({ message: "User with same email already exists", success: false });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Model({
            email,
            password: hashedPassword,
            name,
            role
        });
        if (role === 'teacher' && req.body.speciality) {
            newUser.speciality = req.body.speciality;
        }
        await newUser.save();
        // console.log("Working");
        res.status(200).send({ message: "User created successfully", success: true });
    } catch (error) {
        res.status(500).send({ message: "Server error", success: false });
    }
        
})


router.post('/login',async (req,res)=>{
    try{
        // console.log(req.body);
        const { email, password, role } = req.body;
        let Model = role === 'teacher' ? Teacher : Student;

        const user = await Model.findOne({ email });
        if (!user) {
            return res.status(200).send({message: "User does not exists",success: false})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(200).send({message: "Incorrect password or email address", success: false})
        }
        const token = await jwt.sign({ id: user._id, myRole: role}, process.env.JWT_SECRET,{
            expiresIn: "1d"
        })
        // console.log("Working");
        res.status(200).send({message: "Login Successfull",success: true, data: {token}})

    }
    catch(error){
        res.status(500).send({message: "Server error",success: false,error})
    }
})

router.post('/get-user-info-by-id',authMiddleware, async (req,res)=>{
    try{
        let Model = req.body.role === 'teacher' ? Teacher : Student;
        const user = await Model.findOne({_id: req.body.userId})
        if(!user){
            return res.status(200).send({
                message: "User not found", success: false
            })
        }
        else{
            
            return res.status(200).send({
                success: true,
                data: {
                    name: user.name,
                    email: user.email
                }
            })
        }
    }
    catch(error){
        return res.status(500).send({
            message: "Error getting user info",
            success: false
        })
    }
})


module.exports = router


























