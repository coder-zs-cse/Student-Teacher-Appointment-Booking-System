const express = require("express")
const app = express()
require('dotenv').config()
const dbConfig = require("./config/dbConfig")
const userRouter = require('./routes/userRoute')
const cors = require("cors")
const port = process.env.port || 5000


app.use(cors())
app.use(express.json())

function start(){
    console.log("IT is happening");
}
app.use('/api/user',userRouter)

app.listen(port,()=>{
    console.log(`MONGO URI is ${process.env.MONGO_URI}`);
    console.log(`Listening at ${port}`);
})