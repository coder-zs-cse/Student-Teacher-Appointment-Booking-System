const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require('../models/userModel.js')

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


router.post('/login',(req,res)=>{

})

module.exports = router


























