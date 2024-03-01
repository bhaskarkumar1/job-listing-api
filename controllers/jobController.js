const Job = require("../models/Job");
const mongoose = require("mongoose");
const allPost = async(req, res) => {
  try{
  const allJob= await Job.find({})
  res.send(allJob);
}catch(error){
  res.send(error)
}
};

const createAjob = async (req, res) => {
  try {
    const {
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      duration,
      durationType,
      locationType,
      skills
    } = req.body;

    console.log(req.body);

    // console.log(companyName)
    if (
      !companyName ||
      !logoUrl ||
      !title ||
      !description ||
      !salary ||
      !location ||
      !duration ||
      !durationType ||
      !locationType ||
      !skills
    ) {
      return res.send("please provide mandatory details");
    }

    const newJobDetails = new Job({
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      durationType,
      locationType,
      skills
    });

    await newJobDetails.save();
    res.json({ message: "Job created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "there was an error creating a new job": error });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.jobId;
    // console.log(req.params)
    // console.log(jobId)
    // { jobId: 'abcff' }
    if (!id) {
      res.status(400).json({
        errorMessage: "Bad request",
      });
    }
    const result = await Job.find({ _id: id });

    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const updateJobDetails = async (req, res) => {
  const jobId = req.params.jobId;
  // console.log(jobId)
  // console.log(req.params)

  // run the basics check
  try {
    const {
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      durationType,
      locationType,
      skills
    } = req.body;

    if (
      !companyName ||
      !logoUrl ||
      !title ||
      !description ||
      !salary ||
      !location ||
      !durationType ||
      !locationType ||
      !skills
    ) {
      return res.json({ message: "please pass all the necessary values" });
    }

    await Job.findOneAndUpdate(
      { _id: jobId },
      {
        companyName,
        logoUrl,
        title,
        description,
        salary,
        location,
        durationType,
        locationType,
        skills
      }
    );
    res.send("OK update by job Id");
  } catch (error) {
    res.json({ errorMessage: error });
  }
};

const getAlljobs = async (req, res) => {
  try {
    // console.log(req.query);
    const title = req.query.title || "";
    let skills = req.query.skills;
    // console.log(skills)
    let formattedSkills;
    if (skills) {
      formattedSkills = skills.split(",");
    }
    
    skills = formattedSkills || "";
    console.log(skills);
    const filteredData = await Job.find(
      {
        title: { $regex: title, $options: "i" },
        skills: { $in: skills },
      },
      { title: 1, salary: 1, logoUrl: 1, location: 1,skills:1 }
    );
    res.send(filteredData);
    // res.json({ data: filteredData });

  } catch (error) {
    res.status(500).send({ errorMessage: error });
    console.log(error)
  }
};

module.exports = {
  allPost,
  createAjob,
  getById,
  updateJobDetails,
  getAlljobs,
};
