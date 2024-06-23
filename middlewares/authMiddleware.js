const express = require("express")
const jwt  = require("jsonwebtoken")
const Student = require("../models/studentModel.js");
const Teacher = require("../models/teacherModel.js");
// const router = express.Router()


function authMiddleware(req,res,next){
    try{
        const token = req.headers["authorization"].split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET,async (err,decoded)=>{
            if(err){
                return res.status(401).send({
                    message: "Auth failed",
                    success: false
                })
            }
            else{
                req.body.role = decoded.myRole
                req.body.userId = decoded.id
                next()
            }
        })
    }
    catch(error){
        return res.status(401).send({
            message: "Auth failed",
            success: false
        })
    }
}

module.exports = authMiddleware
