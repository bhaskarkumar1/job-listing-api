const express= require("express")

const app=express()
const connectDb=require("./config/dbConnect")
connectDb()
const verifyToken=require("./middleWare/authMiddleWare")
const cookieParser = require('cookie-parser')

app.use(cookieParser())


const port=process.env.PORT ||7000
app.use(express.json())

const authRoute=require("./routes/authRoute")
const jobRoute=require("./routes/jobRoutes")
app.get("/health",(req,res)=>{
    console.log("client has made a api request")
    res.json({
        service:"job listing backend api server",
        status:true,
        time:new Date()
    })
})


app.use("/api/v1/auth",authRoute)

app.use("/api/v1/jobs",verifyToken,jobRoute)

app.use("/*",(req,res)=>{
    res.status(404).json({
        message:"Page Not Found",
    })
})

app.listen(port,()=>{
    console.log("Server has been started on port: ",port)
})