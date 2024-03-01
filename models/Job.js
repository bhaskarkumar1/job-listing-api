const mongoose=require("mongoose")

const jobSchema= new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    logoUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

    salary:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    durationType:{
        type:String,
        required:true
    },
    locationType:{
        type:String,
        required:true
    },
    skills: {
        type: Array,
        required: true,
    }
   

},
{ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
)

const Job=mongoose.model("Job",jobSchema);

module.exports=Job