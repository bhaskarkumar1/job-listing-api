const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();


const register = async (req, res) => {
  // res.send("Register")
  // const details= await User.find({})
  // console.log(req.body)
  try {
    const userEmail = req.body.email;

    const existingUser = await User.findOne({ email: userEmail });
    // console.log(existingUser)

    if (!existingUser) {
      const hashedpwd = bcrypt.hashSync(req.body.password, 10);

      const newDoc = new User({
        name: req.body.name,
        email: req.body.name,
        password: hashedpwd,
      });
      await newDoc.save();
      res.send("details saved ");
    } else {
      res.json({ Status: " email already in Use !" });
    }
  } catch (error) {
    console.log("Error during registrarion");
    res.json({ "Error during registrarion": error });
  }
};

// Login Routes

const login = async (req, res) => {
  try {
    const emailExists = await User.findOne({ email: req.body.email });
    // console.log(emailExists)
    if (emailExists) {
      // go for checking password then
      const flag = await bcrypt.compare(
        req.body.password,
        emailExists.password
      );

      // const flag=await User.findOne({email:req.body.email,password:unhash})

      if (flag) {
        const token = jwt.sign({},process.env.SECRET_KEY, {
          expiresIn: "5h",
        });

        // res.json({"token":token})
        res.cookie("token", token, { httpOnly: true });

        res.json({
          message: "User logged in",
        });
      } else {
        res.json({ "password is wrong!": true });
      }
    } else {
      res.json({ "error status": "email not registered !" });
    }
  } catch (error) {
    res.json({ "error while login": error });
  }
};

module.exports = { login, register };
