function teacherAuth(req,res,next){
    try{
        if(req.body.role=='teacher'){
            next()
        }
        else{
            res.status(401).send({
                message: "You are not authorized to access this endpoint",
                success:false
            })
        }
    }
    catch(error){
        return res.status(401).send({
            message: "Auth failed",
            success: false
        })
    }
}

module.exports = teacherAuth
