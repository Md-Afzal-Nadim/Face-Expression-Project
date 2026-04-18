const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");


// register
async function registerUser(req, res){

  const {username, email, password} = req.body;

  const isAlreadyRegistered = await userModel.findOne({
    $or: [
      {username},
      {email}
    ]
  })

  if(isAlreadyRegistered){
    return res.status(400).json({
      message: "User already registered"
    })
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash
  })

  const token = jwt.sign({
    id: user._id,
    username: user.username,
  }, process.env.JWT_SECRET,
    {
      expiresIn: "3d"
    }
  )

  res.cookie("token", token)

  return res.status(201).json({
    message: "User registered successfully",
    user:{
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}


// login
async function loginUser(req, res){
  const {username, email, password} = req.body;

  const user = await userModel.findOne({
    $or: [
      {username},
      {email}
    ]
  }).select("+password")// ye lagane se login ho jayega (ye userSchema password se aaya hai (sellect: false))

  if(!user){
    return res.status(400).json({
      message: "Invalid credentials"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
    return res.status(400).json({
      message: "Invalid credentials"
    })
  }

  const token = jwt.sign({
    id: user._id,
    username: user.username,
  }, process.env.JWT_SECRET,
    {
      expiresIn: "3d"
    }
  )

  res.cookie("token", token)

  return res.status(200).json({
    message: "User logged in successfully",
    user:{
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}


// get me
async function getMe(req, res) {
  const user = await userModel.findById(req.user.id)

  return res.status(200).json({
    message: "User fetched successfully",
    user
  })
}


// logout
async function logoutUser(req, res) {
  const token = req.cookies.token;

  res.clearCookie("token");
// token ko redis me blacklist kar rahe hai.
  await redis.set(token, Date.now().toString(), "EX", 60 * 60);

 
 // tokon ko mongodb me blacklist kar rahe the.
  /* await blacklistModel.create({
    token
  })*/

  return res.status(200).json({
    message: "User logout successfully"
  })
}


module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser
}