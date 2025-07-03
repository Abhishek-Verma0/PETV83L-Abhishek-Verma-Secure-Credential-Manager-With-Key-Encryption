//  this is to check whether     user is logged in by checking JWT token
//  this middleware  verifies jwt token ensure user exsist
//  ensure protected routes  if authentiction succeeds

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorisation")?.replace("Bearer", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "No authentication tokenm, access denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  finding the user and verifying if user exist
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found " });
    }

    //  attachin the user information to the  request

    req.user = {
      userId: user._id,
      username: user.username,
    };
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = auth;
