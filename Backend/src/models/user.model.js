const mongoose = require("mongoose");


const userSchema =  new mongoose.Schema({
  username:{
    type: String,
    required: [true, "Please enter your username"],
    unique: [true, "username must be unique"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "email must be unique"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    select: false // jab data getMe(fetch) karte hai to password nahi aayega user ka. 
  },
  
})

const userModel = mongoose.model("user", userSchema);



module.exports = userModel