const jwt=require("jsonwebtoken")
require('dotenv').config()

const verifyToken=(req,res,next)=>{
    // const token=req.header("Authorization")
    const token = req.cookies.token;
    // console.log(token)

    if(token){
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if(decoded){
        next()
    }else{
        console.log("Invalid Token")
    }
}else{
    res.send("Provide Token atleast")
}

}


module.exports=verifyToken