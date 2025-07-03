const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtokn");

//  registration of user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //  check if user already exists or not

    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists" });
    }

    //  create user
    user = new User({
      username,
      email,
      password,
    });
    await user.save();

    //  creating a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

//  user login

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    //  finding user
    const user = await User.findOne({
      $or: [{ email: username }, { username }],
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //  check for the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error loggin in" });
  }
});

//  credetinal token access time one minute

router.post("/credential-access", async (req, res) => {
  try {
    const { userId } = req.body;

    //  generating short lived token for credential access
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });
    res.json({ token });
  } catch (error) {
    console.error("Credential access error:", error);
    res.status(500).json({
      message: error.message || "Error generating credential access token",
    });
  }
});

//  verifying the password

router.post("/verify-password", auth, async (req, res) => {
  let rawPassword = req.body.password;
  try {
    //  getting the user
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  if found then verify password
    const isValid = await user.comparePassword(rawPassword);
    res.json({ isValid });
  } catch (error) {
    console.error("password verification error:", error);
    res.status(500).json({ message: "Error verifying the password " });
  } finally {
    //  clear all sensitve data
    rawPassword = null;
  }
});


//  get current user

router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password -salt");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({message:"Error fetching user"})
    }
})

module.exports = router;