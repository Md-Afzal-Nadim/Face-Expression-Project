const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");
const jwt = require("jsonwebtoken");


async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }


  // logout hone ke baad token blacklisted ho jayega. isse aatekar used nahi kar payega.
  /*const blacklistedToken = await blacklistModel.findOne({
     token 
    })*/

  const blacklistedToken = await redis.get(token);

  if (blacklistedToken) {
    return res.status(401).json({
      message: "Token is blacklisted",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
       process.env.JWT_SECRET

      )

      req.user=decoded

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = {
  authUser
}