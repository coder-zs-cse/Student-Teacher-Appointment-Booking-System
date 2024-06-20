const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')

router.use(express.json()) 

router.post('/register',async (req,res)=>{
    console.log(req.body);
    // res.send({message: "very good"})
    try{
        console.log(req.body);
        const userExist = await User.findOne({email: req.body.email})
        if(userExist){
            return res.status(200).send({message: "User with same email already exists",success: false})
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword
        const newUser = new User(req.body)
        await newUser.save()
        // console.log("Working");
        res.status(200).send({message: "User created successfully",success: true})
    }
    catch(error){
        res.status(500).send({message: "Server error",success: false})
    }
})


router.post('/login',async (req,res)=>{
    try{
        console.log(req.body);
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(200).send({message: "User does not exists",success: false})
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            return res.status(200).send({message: "Incorrect password or email address", success: false})
        }
        const token = await jwt.sign({ id: user._id}, process.env.JWT_SECRET,{
            expiresIn: "1d"
        })
        console.log("Working");
        res.status(200).send({message: "Login Successfull",success: true, data: {token}})

    }
    catch(error){
        res.status(500).send({message: "Server error",success: false,error})
    }
})

module.exports = router


























