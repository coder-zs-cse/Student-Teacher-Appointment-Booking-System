const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI)

const connection = mongoose.connection

connection.on("connected",()=>{
    console.log(`MongoDB is connected`);
})

connection.on("error",()=>{
    
    console.log(`There has been some error while setting up MongoDB`);
})

module.exports = mongoose