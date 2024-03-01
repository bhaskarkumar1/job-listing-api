const express= require("express")
const { allPost, createAjob, getById,updateJobDetails,getAlljobs } = require("../controllers/jobController")

const Router=express.Router()


Router.get("/allPost",allPost)

Router.post("/create",createAjob)

Router.get("/details/:jobId",getById)

Router.put("/edit/:jobId",updateJobDetails)

Router.get("/all-jobs",getAlljobs)

module.exports=Router