const express = require("express")
const app = express()
require('dotenv').config()
const dbConfig = require("./config/dbConfig")

const port = process.env.port || 3000



app.listen(port,()=>{
    console.log(`MONGO URI is ${process.env.MONGO_URI} `);
    console.log(`Listening at ${port}`);
})